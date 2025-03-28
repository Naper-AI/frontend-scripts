/**
 * Naper Store Creation and Plan Selection Flow
 */

// Store State Management
const NaperSignup = {
  state: {
    currentView: 'loading',
    userData: null,
    subscriptions: null,
    newStoreData: null,
    selectedPlan: null
  },

  // View Components
  views: {
    loading: `
      <div class="np:flex np:items-center np:justify-center np:p-8">
        <div class="np:flex np:flex-col np:items-center">
          <svg class="np:animate-spin np:h-10 np:w-10 np:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="np:opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="np:opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="np:mt-4 np:text-gray-600">Loading your information...</p>
        </div>
      </div>
    `,

    createStore: `
      <div class="np:bg-white np:rounded-lg np:shadow-md np:p-8 np:max-w-md np:mx-auto">
        <h2 class="np:text-2xl np:font-bold np:text-gray-800 np:mb-6">Create Your New Store</h2>
        <form id="naper-create-store-form" class="np:space-y-6">
          <div>
            <label for="store_name" class="np:block np:text-sm np:font-medium np:text-gray-700 np:mb-1">Store Name</label>
            <input type="text" id="store_name" name="site_name" placeholder="My Awesome Store" required
              class="np:w-full np:px-4 np:py-2 np:border np:border-gray-300 np:rounded-md np:shadow-sm np:focus:ring-blue-500 np:focus:border-blue-500">
          </div>
          <button type="submit" 
            class="np:w-full np:px-4 np:py-2 np:bg-blue-600 np:text-white np:rounded-md np:shadow-sm np:hover:bg-blue-700 np:focus:outline-none np:focus:ring-2 np:focus:ring-blue-500">
            Continue to Select Plan
          </button>
        </form>
      </div>
    `,

    planSelection: `
      <div class="np:bg-white np:rounded-lg np:shadow-md np:p-8 np:max-w-6xl np:mx-auto">
        <p class="np:text-center np:text-gray-600">Loading pricing table...</p>
      </div>
    `,

    creatingStore: `
      <div class="np:flex np:items-center np:justify-center np:p-8">
        <div class="np:flex np:flex-col np:items-center">
          <svg class="np:animate-spin np:h-10 np:w-10 np:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="np:opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="np:opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="np:mt-4 np:text-gray-600">Creating your store...</p>
          <p class="np:mt-2 np:text-sm np:text-gray-500">This will only take a moment</p>
        </div>
      </div>
    `,

    storeLimit: `
      <div class="np:bg-white np:rounded-lg np:shadow-md np:p-8 np:max-w-md np:mx-auto">
        <div class="np:flex np:justify-center np:mb-6">
          <svg class="np:h-16 np:w-16 np:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h2 class="np:text-xl np:font-bold np:text-center np:text-gray-800 np:mb-4">Store Limit Reached</h2>
        <p class="np:text-gray-600 np:mb-6 np:text-center">You've reached the maximum number of free stores.</p>
        <div class="np:space-y-4">
          <a href="javascript:void(0)" onclick="window.location.href = window.location.pathname;" class="np:block np:w-full np:px-4 np:py-2 np:bg-blue-600 np:text-white np:text-center np:rounded-md np:shadow-sm np:hover:bg-blue-700">
            See Your Stores
          </a>
        </div>
      </div>
    `,

    storeList: `
      <div class="np:bg-white np:rounded-lg np:shadow-md np:p-8 np:max-w-4xl np:mx-auto">
        <div class="np:flex np:justify-between np:items-center np:mb-6">
          <h2 class="np:text-2xl np:font-bold np:text-gray-800">Your Stores</h2>
          <button id="naper-create-new-store" class="np:px-4 np:py-2 np:bg-blue-600 np:text-white np:rounded-md np:shadow-sm np:hover:bg-blue-700 np:focus:outline-none np:focus:ring-2 np:focus:ring-blue-500">
            Create New Store
          </button>
        </div>
        <div id="naper-store-list" class="np:space-y-4">
          <!-- Store items will be dynamically inserted here -->
        </div>
      </div>
    `,

    storeItem: `
      <div class="np:flex np:items-center np:justify-between np:p-4 np:border np:border-gray-200 np:rounded-lg np:hover:bg-gray-50">
        <div>
          <h3 class="np:font-medium np:text-lg">{{store.name}}</h3>
          <span class="np:inline-block np:mt-1 np:px-2 np:py-1 np:text-xs np:font-semibold np:rounded-full {{store.plan_class}}">{{store.plan}}</span>
        </div>
        <div class="np:flex np:space-x-2">
          <a href="#" class="np:upgrade-link np:px-3 np:py-1 np:bg-blue-600 np:text-white np:rounded np:text-sm np:hover:bg-blue-700">
            Upgrade
          </a>
        </div>
      </div>
    `
  },

  init() {
    // Otherwise, show loading view and fetch user data
    this.renderView('loading');
    this.fetchUserData();
  },

  createContainer() {
    const container = document.createElement('div');
    container.id = 'naper-signup-container';
    container.className = 'np:font-sans np:antialiased np:text-gray-900 np:max-w-6xl np:mx-auto np:p-4';
    document.body.appendChild(container);
    return container;
  },

  renderView(viewName) {
    const container = document.getElementById('naper-signup-container');
    if (!container) return;

    this.state.currentView = viewName;

    // For planSelection view, we'll handle the content in the setupPlanSelectionHandlers method
    if (viewName !== 'planSelection') {
      container.innerHTML = this.views[viewName];
    }

    // Setup event handlers based on the view
    switch (viewName) {
      case 'createStore':
        this.setupCreateStoreHandlers();
        break;
      case 'planSelection':
        this.setupPlanSelectionHandlers();
        break;
      case 'storeList':
        this.renderStoreList();
        this.setupStoreListHandlers();
        break;
    }
  },

  fetchUserData() {
    Promise.all([
      fetch('/portal/v1/me').then(res => res.json()),
      fetch('/portal/v1/subscriptions').then(res => res.json())
    ])
    .then(([userData, subscriptions]) => {
      this.state.userData = userData;
      this.state.subscriptions = subscriptions;
  
      this.determineInitialView();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Show error message
      document.getElementById('naper-signup-container').innerHTML = `
        <div class="np:bg-red-50 np:rounded-lg np:p-4 np:border np:border-red-200">
          <h3 class="np:text-red-800 np:font-medium">Something went wrong</h3>
          <p class="np:text-red-600">We couldn't load your information. Please try again later.</p>
        </div>
      `;
    });
  },

  determineInitialView() {
    const { userData, subscriptions } = this.state;

    // Check URL parameters again to ensure we don't override the plan selection
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get('site_id');
    const createNew = urlParams.get('create_new');

    // If create_new parameter exists, show create store form
    if (createNew) {
      this.renderView('createStore');
      return;
    }

    // If site_id exists in URL and we're on the /plans page, show plan selection
    // This takes precedence over any other view determination
    if (siteId) {
      this.state.newStoreData = { id: siteId };
      this.renderView('planSelection');
      return;
    }

    // No subscriptions or all are expired
    if (!subscriptions || subscriptions.length === 0) {
      this.renderView('createStore');
      return;
    }

    // If they have stores, show the store list
    if (subscriptions.some(sub => sub.site_id !== null)) {
      this.renderView('storeList');
    }
  },

  setupCreateStoreHandlers() {
    const form = document.getElementById('naper-create-store-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const storeName = form.querySelector('input[name="site_name"]').value;
      if (!storeName.trim()) {
        this.showNotification('Please enter a store name', 'error');
        return;
      }

      this.renderView('creatingStore');
  
      const formData = new FormData(form);
  
      fetch('/portal/v1/sites', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          this.state.newStoreData = data.site;
          this.renderView('planSelection');
        } else {
          this.showNotification(data.error.message || 'Store creation failed', 'error');
          this.renderView('createStore');
        }
      })
      .catch(error => {
        console.error('Error creating store:', error);
        this.showNotification('An error occurred while creating the store', 'error');
        this.renderView('createStore');
      });
    });
  },

  setupPlanSelectionHandlers() {
    // Look for a pricing table div to clone from Gutenberg blocks
    const pricingTableElement = document.getElementById('pricing-table');
    if (!pricingTableElement) {
      console.error('Pricing table element not found with ID: pricing-table');
      return;
    }

    // Get or create our container
    const container = document.getElementById('naper-signup-container');
    if (container) {
      // Clear existing content
      container.innerHTML = '';
  
      // Show upgrade banner if there's a site_id in the URL (indicating we're upgrading)
      const urlParams = new URLSearchParams(window.location.search);
      const siteId = urlParams.get('site_id');
      const upgrading = urlParams.get('upgrading');
  
      if (siteId && upgrading) {
        // Create upgrade notification banner
        const upgradeBanner = document.createElement('div');
        upgradeBanner.className = 'np:bg-blue-50 np:border-blue-200 np:border np:rounded-lg np:p-4 np:mb-6 np:text-center';
        upgradeBanner.innerHTML = `
          <p class="np:text-blue-800">
            <span class="np:font-semibold">Upgrading your store:</span> 
            Select a new plan below to upgrade your subscription.
          </p>
        `;
        container.appendChild(upgradeBanner);
      }
  
      // Move the pricing table to our container (preserves all event handlers)
      // Save the original parent to restore later if needed
      const originalParent = pricingTableElement.parentNode;
      container.appendChild(pricingTableElement);
  
      // Find all subscribe buttons in the moved pricing table
      const subscribeButtons = container.querySelectorAll('.subscribe-button');
  
      // Set up handlers for subscribe buttons
      subscribeButtons.forEach(button => {
        // Remove the href attribute so it doesn't navigate away
        button.removeAttribute('href');

        // Get the pricing ID directly from the button ID
        const buttonId = button.id;

        // Set up click handler
        button.addEventListener('click', () => {
          if (buttonId === 'free-plan') {
            // For free plan, redirect directly to dashboard
            window.location.href = `/dashboard?site_id=${this.state.newStoreData?.id || siteId || ''}`;
          } else {
            // For paid plans, use the button ID directly as the price ID for Stripe
            const checkoutUrl = this.buildCheckoutUrl(buttonId, siteId);
            window.location.href = checkoutUrl;
          }
        });
      });
    }
  },

  buildCheckoutUrl(priceId, urlSiteId) {
    const baseUrl = '/portal/v1/payments/stripe/checkout';

    // Use the site ID from the state if available, otherwise use the one from the URL
    const siteId = this.state.newStoreData?.id || urlSiteId;

    if (!siteId) {
      console.error('No site ID found for checkout');
      return '/plans';
    }

    const successUrl = `https://naper.ai/dashboard?site_id=${siteId}`;
    const cancelUrl = window.location.href;

    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('price_id', priceId);
    url.searchParams.set('site_id', siteId);
    url.searchParams.set('success_url', successUrl);
    url.searchParams.set('cancel_url', cancelUrl);

    return url.toString();
  },

  renderStoreList() {
    const storeList = document.getElementById('naper-store-list');
    if (!storeList || !this.state.subscriptions) return;

    storeList.innerHTML = '';

    this.state.subscriptions.forEach(subscription => {
      if (subscription.site_id) {
        const storeItem = document.createElement('div');

        // Set plan class based on subscription type
        let planClass = subscription.is_free ? 
          'np:bg-gray-100 np:text-gray-800' : 
          'np:bg-blue-100 np:text-blue-800';

        let planName = subscription.is_free ? 'Free Plan' : 'Premium Plan';

        // Replace template variables
        let itemHtml = this.views.storeItem
          .replace(/\{\{store\.name\}\}/g, subscription.site.name || 'Unnamed Store')
          .replace(/\{\{store\.id\}\}/g, subscription.site.id)
          .replace(/\{\{store\.plan\}\}/g, planName)
          .replace(/\{\{store\.plan_class\}\}/g, planClass);

        storeItem.innerHTML = itemHtml;

        // Handle upgrade link visibility
        const upgradeLink = storeItem.querySelector('.np\\:upgrade-link');
        if (upgradeLink) {
          if (subscription.is_free) {
            // For free subscriptions, show the upgrade link and set it to the current page with site ID
            upgradeLink.style.display = 'inline-flex';
            // Get the current URL and add the site_id parameter
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.set('site_id', subscription.site_id);
            currentUrl.searchParams.set('upgrading', true);
            upgradeLink.href = currentUrl.toString();
          } else {
            // For paid subscriptions, hide the upgrade link
            upgradeLink.style.display = 'none';
          }
        }

        storeList.appendChild(storeItem);
      }
    });

    if (storeList.children.length === 0) {
      storeList.innerHTML = `
        <div class="np:text-center np:py-8 np:text-gray-500">
          <p>You don't have any stores yet.</p>
        </div>
      `;
    }
  },

  setupStoreListHandlers() {
    const createButton = document.getElementById('naper-create-new-store');
    if (!createButton) return;

    createButton.addEventListener('click', () => {
      // Check if user can create more stores
      const hasReachedLimit = this.checkStoreLimit();
  
      if (hasReachedLimit) {
        this.renderView('storeLimit');
      } else {
        this.renderView('createStore');
      }
    });
  },

  checkStoreLimit() {
    const { userData, subscriptions } = this.state;

    // Super admins have no limit
    if (userData.user.is_super_admin) return false;

    // Check for free subscription limit
    const hasFreeSubscription = subscriptions.some(sub => sub.is_free);
    const hasFreeStore = subscriptions.some(sub => sub.site_id !== null && sub.is_free);

    // If they have a free subscription and a free store, they've reached the limit
    return hasFreeSubscription && hasFreeStore;
  },

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `np:fixed np:bottom-4 np:right-4 np:px-6 np:py-3 np:rounded-lg np:shadow-lg np:z-50 ${
      type === 'error' ? 'np:bg-red-500 np:text-white' : 'np:bg-blue-500 np:text-white'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('np:opacity-0', 'np:transition-opacity', 'np:duration-500');
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
};

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  NaperSignup.init();
});

// Add Tailwind styles
const naperStyles = document.createElement('style');
naperStyles.textContent = `
  /* Tailwind preflight base styles with np: prefix */
  .np\\:font-sans { font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
  .np\\:antialiased { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  
  /* Animation utilities */
  @keyframes npSpin { to { transform: rotate(360deg); } }
  .np\\:animate-spin { animation: npSpin 1s linear infinite; }
  
  /* Add more styles as needed */
`;
document.head.appendChild(naperStyles); 