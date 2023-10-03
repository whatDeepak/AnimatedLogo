// Customisation
const refreshDragThreshold = 100;
const refreshGrowMultiplier = 0.5;

const logoFadeDuration = 0.2;
const logoRunnerDuration = 1;
const logoWaitDuration = 0.25;
const logoRunnerLength = 300;

// Elements
const pageElement = document.querySelector('.page');
const refresherElement = document.querySelector('.refresher');
const logoWrapperElement = document.querySelector('.logoWrapper');
const logoElement = document.querySelector('#animated-logo');
let logoRunnerElement = document.querySelector('.animated-logo-runner');
const logoSelectorElement = document.querySelector('#logo-selector');

// State & Private Variables
let logoLength = 0;
const refresherHeight = refresherElement.clientHeight;
let cursorDown = false;
let isPullingPage = false;
let isLoading = false;
let cursorStartY = 0;
let cursorDeltaY = 0;

// Init
LoadLogo("threads-logo");

// Events
pageElement.addEventListener('mousedown', onPress);
pageElement.addEventListener('touchstart', onPress);

pageElement.addEventListener('mouseup', onRelease);
pageElement.addEventListener('touchend', onRelease);

pageElement.addEventListener('mousemove', (e) => onDrag(e.clientY, e));
pageElement.addEventListener('touchmove', (e) => onDrag(e.touches[0].clientY, e));

window.addEventListener('keydown', async (e) => {
  if (e.code === "KeyR" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (isLoading) return;
    isPullingPage = true;
    pageElement.scrollTop = 0;
    pageElement.classList.toggle('pop', true);
    refresherElement.classList.toggle('pulling', true);
    logoElement.style.setProperty('--logo-runner-offfset', -logoLength);
    logoRunnerElement.style.transition = logoRunnerDuration + 's ease-in-out';
    
    logoElement.classList.toggle('loading', true);
    startLoading();
    await WaitFor(logoRunnerDuration + logoWaitDuration);
    logoElement.style.setProperty('--logo-runner-offfset', 0);
    pageElement.classList.toggle('pop', false);
    isPullingPage = false;
    refresherElement.classList.toggle('pulling', false);
    logoRunnerElement.style.transition = null;
  }
})

logoSelectorElement.addEventListener('change', () => LoadLogo(logoSelectorElement.value));

function onPress() {
  cursorDown = true;
}

function onRelease() {
  cursorDown = false
  if (!isPullingPage) return;
  
  if (cursorDeltaY === refreshDragThreshold) {
    startLoading();
  }
  
  isPullingPage = false;
  refresherElement.classList.toggle('pulling', false);
  pageElement.classList.toggle('pop', false);
  refresherElement.style.height = null;
  logoWrapperElement.style.transform = null;
  logoElement.style.setProperty('--logo-runner-offfset', 0);
}

function onDrag(cursorY, event) {
  if (!cursorDown) return;
  if (isLoading) return;
  if (pageElement.scrollTop !== 0) return;
  event.preventDefault();
  
  if (!isPullingPage) {
    cursorStartY = cursorY;
  }
  
  cursorDeltaY = Math.min(Math.max(cursorY - cursorStartY, 0), refreshDragThreshold);
  
  const dragProgress = (cursorDeltaY / refreshDragThreshold);
  logoWrapperElement.style.transform = `scale(${
    1 + (refreshGrowMultiplier * dragProgress)
  })`;
  refresherElement.style.height = `${refresherHeight + cursorDeltaY}px`;
  logoElement.style.setProperty('--logo-runner-offfset', RemapRange(dragProgress, 0, 1, logoRunnerLength, -logoLength));
  
  refresherElement.classList.toggle('pulling', cursorDeltaY > 0);
  pageElement.classList.toggle('pop', cursorDeltaY === refreshDragThreshold);
  isPullingPage = true;
}

async function startLoading() {
  if (logoElement.classList.contains('active')) return;
  logoElement.classList.toggle('active', true);
  isLoading = true;
  
  // Animate back again
  if (!logoElement.classList.contains('loading')) {
    await WaitFor(logoWaitDuration + logoRunnerDuration);
    logoElement.classList.toggle('loading', true);
  }
  
  // Animate the full logo
  await WaitFor(logoWaitDuration + logoRunnerDuration);
  logoElement.classList.toggle('loading', false);
  logoElement.classList.toggle('complete', true);
  
  await WaitFor(logoRunnerDuration);
  stopLoading();
}

async function stopLoading() {
  if (!logoElement.classList.contains('active')) return;
  logoElement.classList.toggle('active', false);
  
  // Wait for the logo animations to reset
  await WaitFor(logoFadeDuration * 1.5);
  
  logoElement.classList.toggle('loading', false);
  logoElement.classList.toggle('complete', false);
  isLoading = false;
}

function WaitFor(time) {
   return new Promise((res) => setTimeout(() => res(), time * 1000));
}

function RemapRange(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function LoadLogo(logo) {
  logoElement.innerHTML = document.querySelector(`#${logo}`).innerHTML
  logoRunnerElement = logoElement.querySelector('.animated-logo-runner');
  logoLength = logoRunnerElement.getTotalLength();
  
  logoElement.style.setProperty('--logo-length', logoLength);
  logoElement.style.setProperty('--logo-runner-length', logoRunnerLength);
  logoElement.style.setProperty('--logo-runner-offfset', 0);
  logoElement.style.setProperty('--logo-duration-fade', `${logoFadeDuration}s`);
  logoElement.style.setProperty('--logo-duration-runner', `${logoRunnerDuration}s`);
}

/*

JS2TS
Become #1
Follow me
I made JS2TS free. Help me spread the word!

New +
Copy codeCopy Icon
// Customisation
const refreshDragThreshold: number = 100;
const refreshGrowMultiplier: number = 0.5;

const logoFadeDuration: number = 0.2;
const logoRunnerDuration: number = 1;
const logoWaitDuration: number = 0.25;
const logoRunnerLength: number = 300;

// Elements
const pageElement: HTMLElement | null = document.querySelector('.page');
const refresherElement: HTMLElement | null = document.querySelector('.refresher');
const logoWrapperElement: HTMLElement | null = document.querySelector('.logoWrapper');
const logoElement: HTMLElement | null = document.querySelector('#animated-logo');
let logoRunnerElement: HTMLElement | null = document.querySelector('.animated-logo-runner');
const logoSelectorElement: HTMLSelectElement | null = document.querySelector('#logo-selector');

// State & Private Variables
let logoLength: number = 0;
const refresherHeight: number = refresherElement?.clientHeight || 0;
let cursorDown: boolean = false;
let isPullingPage: boolean = false;
let isLoading: boolean = false;
let cursorStartY: number = 0;
let cursorDeltaY: number = 0;

// Init
LoadLogo("threads-logo");

// Events
pageElement?.addEventListener('mousedown', onPress);
pageElement?.addEventListener('touchstart', onPress);

pageElement?.addEventListener('mouseup', onRelease);
pageElement?.addEventListener('touchend', onRelease);

pageElement?.addEventListener('mousemove', (e: MouseEvent) => onDrag(e.clientY, e));
pageElement?.addEventListener('touchmove', (e: TouchEvent) => onDrag(e.touches[0].clientY, e));

window.addEventListener('keydown', async (e: KeyboardEvent) => {
  if (e.code === "KeyR" && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    if (isLoading) return;
    isPullingPage = true;
    pageElement?.scrollTop = 0;
    pageElement?.classList.toggle('pop', true);
    refresherElement?.classList.toggle('pulling', true);
    logoElement?.style.setProperty('--logo-runner-offfset', -logoLength);
    logoRunnerElement?.style.transition = logoRunnerDuration + 's ease-in-out';
    
    logoElement?.classList.toggle('loading', true);
    startLoading();
    await WaitFor(logoRunnerDuration + logoWaitDuration);
    logoElement?.style.setProperty('--logo-runner-offfset', 0);
    pageElement?.classList.toggle('pop', false);
    isPullingPage = false;
    refresherElement?.classList.toggle('pulling', false);
    logoRunnerElement?.style.transition = null;
  }
})

logoSelectorElement?.addEventListener('change', () => LoadLogo(logoSelectorElement.value));

function onPress() {
  cursorDown = true;
}

function onRelease() {
  cursorDown = false
  if (!isPullingPage) return;
  
  if (cursorDeltaY === refreshDragThreshold) {
    startLoading();
  }
  
  isPullingPage = false;
  refresherElement?.classList.toggle('pulling', false);
  pageElement?.classList.toggle('pop', false);
  refresherElement?.style.height = null;
  logoWrapperElement?.style.transform = null;
  logoElement?.style.setProperty('--logo-runner-offfset', 0);
}

function onDrag(cursorY: number, event: MouseEvent | TouchEvent) {
  if (!cursorDown) return;
  if (isLoading) return;
  if (pageElement?.scrollTop !== 0) return;
  event.preventDefault();
  
  if (!isPullingPage) {
    cursorStartY = cursorY;
  }
  
  cursorDeltaY = Math.min(Math.max(cursorY - cursorStartY, 0), refreshDragThreshold);
  
  const dragProgress = (cursorDeltaY / refreshDragThreshold);
  logoWrapperElement?.style.transform = `scale(${
    1 + (refreshGrowMultiplier * dragProgress)
  })`;
  refresherElement?.style.height = `${refresherHeight + cursorDeltaY}px`;
  logoElement?.style.setProperty('--logo-runner-offfset', RemapRange(dragProgress, 0, 1, logoRunnerLength, -logoLength));
  
  refresherElement?.classList.toggle('pulling', cursorDeltaY > 0);
  pageElement?.classList.toggle('pop', cursorDeltaY === refreshDragThreshold);
  isPullingPage = true;
}

async function startLoading() {
  if (logoElement?.classList.contains('active')) return;
  logoElement?.classList.toggle('active', true);
  isLoading = true;
  
  // Animate back again
  if (!logoElement?.classList.contains('loading')) {
    await WaitFor(logoWaitDuration + logoRunnerDuration);
    logoElement?.classList.toggle('loading', true);
  }
  
  // Animate the full logo
  await WaitFor(logoWaitDuration + logoRunnerDuration);
  logoElement?.classList.toggle('loading', false);
  logoElement?.classList.toggle('complete', true);
  
  await WaitFor(logoRunnerDuration);
  stopLoading();
}

async function stopLoading() {
  if (!logoElement?.classList.contains('active')) return;
  logoElement?.classList.toggle('active', false);
  
  // Wait for the logo animations to reset
  await WaitFor(logoFadeDuration * 1.5);
  
  logoElement?.classList.toggle('loading', false);
  logoElement?.classList.toggle('complete', false);
  isLoading = false;
}

function WaitFor(time: number) {
   return new Promise((res) => setTimeout(() => res(), time * 1000));
}

function RemapRange(value: number, low1: number, high1: number, low2: number, high2: number) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function LoadLogo(logo: string) {
  logoElement?.innerHTML = document.querySelector(`#${logo}`)?.innerHTML
  logoRunnerElement = logoElement?.querySelector('.animated-logo-runner');
  logoLength = logoRunnerElement?.getTotalLength() || 0;
  
  logoElement?.style.setProperty('--logo-length', logoLength);
  logoElement?.style.setProperty('--logo-runner-length', logoRunnerLength);
  logoElement?.style.setProperty('--logo-runner-offfset', 0);
  logoElement?.style.setProperty('--logo-duration-fade', `${logoFadeDuration}s`);
  logoElement?.style.setProperty('--logo-duration-runner', `${logoRunnerDuration}s`);
}


*/