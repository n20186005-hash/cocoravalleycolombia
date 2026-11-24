import concurrent.futures
import hashlib
import json
import os
import sys
import time
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup

DOMAIN = "www.cocoravalleycolombia.com"
ORIGIN = "https://" + DOMAIN
def body(url):
    request = Request(url, headers={"User-Agent": "Cocora-guide-publication-check/1.0", "Accept": "text/html,application/xml,*/*"})
    for attempt in range(3):
        try:
            with urlopen(request, timeout=24) as response:
                if response.status != 200 or urlparse(response.url).hostname not in (DOMAIN, DOMAIN[4:]):
                    raise ValueError("Unexpected response destination or status")
                return response.read()
        except Exception:
            if attempt == 2: raise
            time.sleep(2 + attempt)

def normalized(tag):
    return " ".join(tag.stripped_strings) if tag else ""

def path(url):
    return urlparse(url).path.rstrip("/")

def paths(xml):
    return {path(e.text) for e in ET.fromstring(xml).findall("{*}url/{*}loc")}

def read_places():
    notes = json.loads(Path("src/lib/attraction-field-notes.json").read_text())
    records = {}
    for key, value in notes.items():
        for index, lang in enumerate(("es", "en", "zh")):
            slug = key.removeprefix("quindio-")
            if key == "salento-plaza": slug = "plaza-bolivar-salento" if lang == "es" else "salento-bolivar-square"
            if key == "salento-alto": slug = "mirador-alto-de-la-cruz" if lang == "es" else "alto-de-la-cruz-viewpoint"
            records[f"/{lang}/{slug}"] = [value[field][index] for field in ("readout", "question", "answer")]
    assert len(records)==93
    return records

def check(p):
    errors, images = [], []
    try:
        local_file = Path("out" + p + ".html")
        if not local_file.is_file(): local_file = Path("out" + p + "/index.html")
        expected = BeautifulSoup(local_file.read_bytes().decode(), "html.parser")
        actual = BeautifulSoup(body(ORIGIN+p).decode(), "html.parser")
        root = actual.main or actual.body
        reference = expected.main or expected.body
        if not root or not reference: raise ValueError("Missing main/body")
        visible = normalized(root)
        def test(condition, label):
            if not condition: errors.append(label)
        test(actual.h1 and normalized(actual.h1) == normalized(expected.h1), "H1")
        test(actual.html.get("lang") == expected.html.get("lang"), "language")
        canonical = actual.select_one('link[rel="canonical"]')
        expected_canonical = expected.select_one('link[rel="canonical"]')
        test(canonical and expected_canonical and path(canonical.get("href",""))==path(expected_canonical.get("href","")), "canonical")
        test(normalized(actual.footer)==normalized(expected.footer), "same-language footer")
        paragraphs = [normalized(el) for el in reference.find_all("p") if len(normalized(el))>=12]
        sample = list(dict.fromkeys(paragraphs))[:4]
        test(all(text in visible for text in sample), "published paragraphs")
        expected_images = set(img.get("src") for img in reference.select("img[src]"))
        actual_images = set(img.get("src") for img in root.select("img[src]"))
        test(expected_images <= actual_images, "original images")
        if p in records:
            test(all(s in visible for s in records[p]), "place-specific prose and FAQ")
            test(bool(root.select_one("section.place-photo-hero img")), "original hero photo")
            test(len(root.select("details"))==4 and len(root.select("dl dt"))>=7 and len(root.select("ol li"))>=3, "FAQ/facts/route")
            test(len(root.select("#nearby-places a[href]"))==2, "two nearby links")
            test(all(path(a["href"]) in indexes and path(a["href"]).startswith("/"+p.split("/")[1]+"/") for a in root.select("#nearby-places a[href]")), "local destinations")
            test(any("maps" in a.get("href","") for a in root.select("a[href]")), "map")
            test(len({a.get("hreflang") for a in root.select("a[hreflang]")})>=3, "language switches")
            images = list(expected_images)
        if "cocora-valley-day-trip" in p or "cocora-en-un-dia" in p:
            test(len(root.select("details"))==3, "three updated itinerary FAQs")
        if p == "/zh/parque-de-los-arrieros":
            test(all(v in visible for v in ("69,000", "10:00", "90–120", "竹林", "甘蔗", "咖啡")), "Arrieros practical data")
    except Exception as ex: errors.append(repr(ex))
    return {"url":ORIGIN+p, "errors":errors, "images":images}

indexes = paths(body(ORIGIN+"/sitemap.xml"))
reference_index = paths(Path("out/sitemap.xml").read_bytes())
records = read_places()
assert indexes==reference_index and len(indexes)==123 and set(records)<=indexes
with concurrent.futures.ThreadPoolExecutor(5) as pool:
    rows = list(pool.map(check,sorted(indexes)))
pictures = sorted({i for row in rows for i in row["images"] if i and i.startswith("/")})
def check_picture(src):
    try:
        data=body(ORIGIN+__import__("urllib.parse",fromlist=["quote"]).quote(src,safe="/%()"))
        local=Path("public"+src)
        if not local.is_file() or hashlib.sha256(local.read_bytes()).digest()!=hashlib.sha256(data).digest(): return src
        return None
    except Exception as ex: return src+" "+repr(ex)
with concurrent.futures.ThreadPoolExecutor(4) as pool: missing_pictures=list(filter(None,pool.map(check_picture,pictures)))
failed=[r for r in rows if r["errors"]]
count=sum(not r["errors"] for r in rows if path(r["url"]) in records)
print(json.dumps({"urls":len(rows),"pass":len(rows)-len(failed),"attractions":count,"photos":len(pictures),"picture_errors":missing_pictures,"failed":[(r["url"],r["errors"]) for r in failed]},ensure_ascii=False),flush=True)
Path("public-audit.json").write_text(json.dumps({"sha":"8f638dd8fa9571de65c0645802bbb65cf4b001ca","pages":rows,"pictures":pictures,"picture_errors":missing_pictures},ensure_ascii=False))
with open(os.environ["GITHUB_STEP_SUMMARY"],"a") as report:
    print(f"{len(rows)-len(failed)}/{len(rows)} public URLs, {count}/93 attraction pages, {len(pictures)-len(missing_pictures)}/{len(pictures)} original photo files.",file=report)
    for row in rows: print("- "+row["url"]+" — "+(", ".join(row["errors"]) or "PASS"),file=report)
assert not failed and not missing_pictures and len(pictures)>=31
