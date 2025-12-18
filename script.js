lucide.createIcons();

// Lógica do Vídeo VSL
const videoElement = document.getElementById('vsl-video');
const ctaOverlay = document.getElementById('vsl-cta');
const startOverlay = document.getElementById('vsl-start-overlay');

function startVideoWithSound() {
  if (videoElement) {
    startOverlay.classList.add('opacity-0', 'pointer-events-none');
    videoElement.muted = false;
    videoElement.volume = 1.0;
    videoElement.play().catch(error => {
      console.log("Autoplay bloqueado ou erro:", error);
    });
  }
}

if (videoElement) {
  videoElement.addEventListener('ended', () => {
    ctaOverlay.classList.remove('hidden');
    ctaOverlay.classList.add('flex');
  });
}

function replayVideo() {
  ctaOverlay.classList.add('hidden');
  ctaOverlay.classList.remove('flex');
  videoElement.currentTime = 0;
  videoElement.play();
}

function toggleFaq(button) {
  const container = button.parentElement;
  container.classList.toggle('faq-active');
  const allFaqs = document.querySelectorAll('.faq-active');
  allFaqs.forEach(faq => { if (faq !== container) faq.classList.remove('faq-active'); });
}

function toggleLossBlock() {
  // Function removed as block is now always visible
}

function startCountdown(durationInSeconds) {
  let timerElementTop = document.getElementById('top-timer');
  let timerElementsPricing = document.querySelectorAll('.pricing-timer-display');
  let endTime = localStorage.getItem('offerEndTime');
  let now = new Date().getTime();

  if (!endTime || now > parseInt(endTime)) {
    endTime = now + (durationInSeconds * 1000);
    localStorage.setItem('offerEndTime', endTime);
  } else {
    endTime = parseInt(endTime);
  }

  setInterval(function () {
    let currentTime = new Date().getTime();
    let distance = endTime - currentTime;

    if (distance < 0) {
      endTime = currentTime + (durationInSeconds * 1000);
      localStorage.setItem('offerEndTime', endTime);
      distance = endTime - currentTime;
    }

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let formattedTime =
      (hours < 10 ? "0" + hours : hours) + ":" +
      (minutes < 10 ? "0" + minutes : minutes) + ":" +
      (seconds < 10 ? "0" + seconds : seconds);

    if (timerElementTop) timerElementTop.textContent = formattedTime;
    timerElementsPricing.forEach(el => el.textContent = formattedTime);
  }, 1000);
}

startCountdown(43200);
