import { i18n } from '../i18n';
import { subscribeToNewsletter } from '../services/subscription';
import { Button } from 'pixelroot32-components-landing-page';

export const WaitlistModal = () => {
  return `
    <div id="waitlist-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div class="w-full max-w-md bg-[#333333] border-2 border-[#1a1a1a] shadow-block flex flex-col animate-in fade-in zoom-in duration-200">
        <!-- Window Header -->
        <div class="bg-[#444444] px-4 py-2 border-b-2 border-[#1a1a1a] flex justify-between items-center">
          <span class="text-white font-mono text-sm font-bold uppercase tracking-wider">${i18n.t('waitlist.title')}</span>
          <button id="close-modal-btn" class="w-5 h-5 bg-[#1a1a1a] flex items-center justify-center hover:bg-retro transition-colors group">
             <span class="text-[#666666] group-hover:text-white text-[10px] leading-none">×</span>
          </button>
        </div>
        
        <!-- Window Content -->
        <div class="p-8">
          <div id="waitlist-form-container">
            <p class="text-text-muted font-mono text-sm mb-8 leading-relaxed">
              ${i18n.t('waitlist.subtitle')}
            </p>
            
            <form id="waitlist-form" class="space-y-6">
              <div class="space-y-2">
                <label for="waitlist-email" class="block text-primary font-mono text-xs uppercase tracking-widest font-bold">
                  ${i18n.t('waitlist.email_label')}
                </label>
                <input 
                  type="email" 
                  id="waitlist-email" 
                  required 
                  placeholder="${i18n.t('waitlist.email_placeholder')}"
                  class="w-full bg-[#1a1a1a] border-2 border-[#1a1a1a] p-3 text-white font-mono text-sm focus:border-primary focus:outline-none transition-colors placeholder:text-[#444444]"
                >
                <p id="waitlist-error" class="hidden text-retro font-mono text-[10px] uppercase mt-1 tracking-tighter"></p>
              </div>
              
              <label class="flex items-center gap-3 cursor-pointer group">
                <div class="relative flex items-center">
                  <input type="checkbox" id="early-access-check" class="sr-only peer">
                  <div class="w-5 h-5 bg-[#1a1a1a] border-2 border-[#1a1a1a] peer-checked:bg-primary transition-all"></div>
                  <svg class="absolute w-3 h-3 text-black left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <span class="text-text-muted font-mono text-xs group-hover:text-white transition-colors">
                  ${i18n.t('waitlist.checkbox')}
                </span>
              </label>
              
              <div class="pt-2">
                ${Button({
                  id: 'waitlist-submit-btn',
                  label: `<span id="submit-text">${i18n.t('waitlist.submit')}</span><span id="submit-loading" class="hidden">Connecting...</span>`,
                  variant: 'primary',
                  className: 'w-full py-4 text-lg'
                })}
                <p class="text-[10px] text-center text-[#666666] font-mono mt-4 uppercase tracking-tighter">
                  ${i18n.t('waitlist.disclaimer')}
                </p>
              </div>
            </form>
          </div>
          
          <!-- Success Message (Hidden by default) -->
          <div id="waitlist-success-msg" class="hidden py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-primary text-3xl">✓</span>
            </div>
            <h3 class="text-white font-mono font-bold text-lg mb-4 uppercase tracking-tighter">
              ${i18n.t('waitlist.success')}
            </h3>
            ${Button({
              id: 'success-close-btn',
              label: i18n.t('waitlist.close'),
              variant: 'outline',
              className: 'mt-8 px-8 py-2 text-sm'
            })}
          </div>
        </div>
      </div>
    </div>
  `;
};

export const initWaitlistModal = () => {
  const modal = document.getElementById('waitlist-modal');
  const openBtns = document.querySelectorAll('.open-waitlist-btn');
  const closeBtn = document.getElementById('close-modal-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const form = document.getElementById('waitlist-form') as HTMLFormElement;
  const formContainer = document.getElementById('waitlist-form-container');
  const successMsg = document.getElementById('waitlist-success-msg');
  const submitBtn = document.getElementById('waitlist-submit-btn') as HTMLButtonElement;
  const submitText = document.getElementById('submit-text');
  const submitLoading = document.getElementById('submit-loading');
  const errorMsg = document.getElementById('waitlist-error');

  const openModal = () => {
    modal?.classList.remove('hidden');
    modal?.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal?.classList.add('hidden');
    modal?.classList.remove('flex');
    document.body.style.overflow = '';
    
    // Reset form after a delay to allow animation to finish
    setTimeout(() => {
      form?.reset();
      formContainer?.classList.remove('hidden');
      successMsg?.classList.add('hidden');
      if (errorMsg) {
        errorMsg.classList.add('hidden');
        errorMsg.textContent = '';
      }
    }, 300);
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);
  successCloseBtn?.addEventListener('click', closeModal);
  
  // Close on backdrop click
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (document.getElementById('waitlist-email') as HTMLInputElement).value;
    const isEarlyAccess = (document.getElementById('early-access-check') as HTMLInputElement).checked;
    
    // Set loading state
    if (submitBtn) submitBtn.disabled = true;
    if (submitText) submitText.classList.add('hidden');
    if (submitLoading) submitLoading.classList.remove('hidden');
    if (errorMsg) errorMsg.classList.add('hidden');

    try {
      const result = await subscribeToNewsletter(email, { early_access: isEarlyAccess });

      if (result.success) {
        // Show success message
        formContainer?.classList.add('hidden');
        successMsg?.classList.remove('hidden');
      } else {
        // Show error message
        if (errorMsg) {
          errorMsg.textContent = result.message || 'Error occurred';
          errorMsg.classList.remove('hidden');
        }
      }
    } catch (error) {
      if (errorMsg) {
        errorMsg.textContent = 'Unexpected error. Try again.';
        errorMsg.classList.remove('hidden');
      }
    } finally {
      // Reset loading state
      if (submitBtn) submitBtn.disabled = false;
      if (submitText) submitText.classList.remove('hidden');
      if (submitLoading) submitLoading.classList.add('hidden');
    }
  });
};
