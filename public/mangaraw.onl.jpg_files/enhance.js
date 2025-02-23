window.addEventListener('load', (event) => {
// Parklogic Enhance Next - version 2 (navy.parklogic.com)
var plBanner = document.getElementById('plBanner');
if (typeof plBanner !== 'undefined' && plBanner !== null) {
	plBanner.innerHTML = '<div style="margin: 0px 0px 20px 0px;width:100%;height:140px;text-align:center;"><a href="https://www.namecheap.com/domains/registration/results/?domain=mangaraw.onl" target="_BLANK"><img src="https://parking3.parklogic.com/page/images/pe262/hero_nc.svg" style="width:100%;height:auto;max-width:1440px;"></a><div style="width:100%;text-align:center;margin-top:10px;"><span style="font-family:Ariel,sans-serif;font-size:16px;color:#888">The domain has expired. Is this your domain?</span> <a href="https://www.namecheap.com/domains/registration/results/?domain=mangaraw.onl" target="_BLANK" style="font-family:Ariel,sans-serif;font-size:16px;color:#EC4B2E;font-weight:bold;">Renew now</a></div></div>';
	plBanner.style.margin = '0px 0px 0px 0px';
	plBanner.style.backgroundColor = 'transparent';
}
});
// Scribe.js - parking3.parklogic.com

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var usid = urlParams.get('usid');
var utid = urlParams.get('utid');
const query = urlParams.get('query');
const domainJs = window.location.hostname;
var path = window.location.pathname;
const afdToken = urlParams.get('afdToken');
const lp = (afdToken === null || afdToken.length === 0) ? 1 : 2;
const ss = typeof(Storage) !== 'undefined';
const timezoneBrowser = Intl.DateTimeFormat().resolvedOptions().timeZone;
const webdriver = navigator.webdriver;

if (ss) {
  sessionStorage.SessionName = 'Scribe';
  if (lp === 1) {
    sessionStorage.setItem('usid', usid);
    sessionStorage.setItem('utid', utid);
    sessionStorage.setItem('path', path);
  } else {
    usid = sessionStorage.getItem('usid');
    utid = sessionStorage.getItem('utid');
    path = sessionStorage.getItem('path');
  }
  getGPUVendor().then(
      function(gpu) { fetch(`https://parking3.parklogic.com/page/scribe.php?pcId=7&domain=mangaraw.onl&pId=1129&usid=${usid}&utid=${utid}&query=${query}&domainJs=${domainJs}&path=${path}&ss=${ss}&lp=${lp}&tzB=${timezoneBrowser}&wd=${webdriver}&gpu=${gpu}`)
          .catch(error => {
            console.error('Error:', error);
          }); },
      function(error) { console.log(error); }
  );
}



async function getGPUVendor() {
  if (!navigator.gpu) {
    return null
  }

  let adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    return null
  }

  return adapter.info.vendor;
}

