const {chromium} = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const origin = 'https://www.cocoravalleycolombia.com';
const details = '/zh/parque-de-los-arrieros';
const out = 'screenshots';
fs.mkdirSync(out,{recursive:true});
async function ready(page, path) {
  const response = await page.goto(origin+path,{waitUntil:'domcontentloaded',timeout:45000});
  assert.equal(response.status(),200);
  await page.locator('h1').first().waitFor({state:'visible'});
  await page.evaluate(()=>document.fonts.ready);
}
async function styles(page){
  return page.evaluate(()=>{
    const style=(el,prop)=>getComputedStyle(el)[prop];
    const head=document.querySelector('header'),foot=document.querySelector('footer'),h1=document.querySelector('h1');
    const img=document.querySelector('section img');
    const photo=img && img.parentElement.querySelector('div[style*="hero-overlay"]');
    return { header:style(head,'fontFamily'), footer:style(foot,'fontFamily'), title:style(h1,'fontFamily'),
      footerColor:style(foot,'backgroundColor'), footerText:foot.innerText.replace(/\s+/g,' ').trim(),
      navLabels:Array.from(head.querySelectorAll('a')).map(a=>a.textContent.trim()).filter(Boolean),
      heroImageFit:img && style(img,'objectFit'), overlay:photo && style(photo,'backgroundColor'),
      viewport:innerWidth, scrollWidth:document.documentElement.scrollWidth };
  });
}
async function capture(page,name){
  await page.screenshot({path:out+'/'+name+'.png',animations:'disabled',timeout:30000});
}
(async()=>{
  const browser=await chromium.launch();
  const page=await browser.newPage({reducedMotion:'reduce',locale:'zh-CN'});
  const results=[];
  for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
    await page.setViewportSize({width,height});
    await ready(page,'/zh');
    await page.locator('section img').first().evaluate(img=>img.decode());
    const homepage=await styles(page);
    await capture(page,name+'-homepage-hero');
    await ready(page,details);
    const hero=page.locator('.place-photo-hero img');
    await hero.evaluate(img=>img.decode());
    const photo=await hero.evaluate(img=>({src:img.getAttribute('src'),width:img.naturalWidth,height:img.naturalHeight}));
    assert.ok(photo.width>100 && photo.height>100);
    const article=await styles(page);
    for(const key of ['header','footer','title','footerColor','footerText','navLabels','heroImageFit','overlay'])
      assert.deepEqual(article[key],homepage[key],name+' shared site treatment '+key);
    assert.ok(article.overlay && article.overlay!=='rgba(0, 0, 0, 0)');
    assert.equal(article.heroImageFit,'cover');
    assert.equal(article.scrollWidth,width,name+' horizontal overflow');
    await capture(page,name+'-attraction-hero');
    const near=page.locator('#nearby-places');
    assert.equal(await near.locator('a').count(),2);
    await near.scrollIntoViewIfNeeded();
    await capture(page,name+'-nearby');
    const links=await near.locator('a').evaluateAll(as=>as.map(a=>({url:a.href,label:a.innerText})));
    const footer=page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    assert.ok(await footer.isVisible());
    await capture(page,name+'-footer');
    for(const link of links){
      await page.locator('#nearby-places').getByRole('link',{name:link.label,exact:true}).click();
      await page.waitForURL(link.url,{timeout:20000});
      await page.waitForFunction(label=>document.querySelector('h1')?.innerText.trim()===label.trim(),link.label);
      assert.ok(new URL(page.url()).pathname.startsWith('/zh/'));
      await page.goBack({waitUntil:'domcontentloaded'});
      await near.waitFor();
    }
    assert.equal(page.context().pages().length,1);
    results.push({viewport:name,width,height,photo,links,overflow:article.scrollWidth-width,
      sharedHeaderFooterAndHeroStyle:true,footerVisible:true,singleTab:true});
  }
  fs.writeFileSync(out+'/visual-checks.json',JSON.stringify(results,null,2));
  console.log(JSON.stringify(results));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
