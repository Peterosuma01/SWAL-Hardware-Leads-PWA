// Configuration Management
const CONFIG_KEY = 'steelwool_script_url';

function getScriptUrl() {
  return localStorage.getItem(CONFIG_KEY) || '';
}

function setScriptUrl(url) {
  localStorage.setItem(CONFIG_KEY, url);
}

// Initialize configuration
const scriptUrlInput = document.getElementById('scriptUrlInput');
const saveConfigBtn = document.getElementById('saveConfigBtn');
const configMessage = document.getElementById('configMessage');

scriptUrlInput.value = getScriptUrl();

saveConfigBtn.addEventListener('click', function() {
  const url = scriptUrlInput.value.trim();
  if (!url) {
    showConfigMessage('Please enter a valid URL', 'error');
    return;
  }
  if (!url.includes('script.google.com')) {
    showConfigMessage('Please enter a valid Google Apps Script URL', 'error');
    return;
  }
  setScriptUrl(url);
  showConfigMessage('Configuration saved successfully!', 'success');
});

function showConfigMessage(text, type) {
  configMessage.className = 'message ' + (type === 'error' ? 'error show' : 'success show');
  configMessage.textContent = text;
  setTimeout(() => configMessage.classList.remove('show'), 3000);
}

// API Call Helper
function callGoogleScript(functionName, params = {}) {
  const scriptUrl = getScriptUrl();
  if (!scriptUrl) {
    return Promise.reject(new Error('Please configure the Google Apps Script URL first'));
  }

  const url = `${scriptUrl}?function=${functionName}&${new URLSearchParams(params).toString()}`;
  
  return fetch(url, {
    method: 'GET',
    redirect: 'follow'
  })
  .then(response => response.json())
  .catch(error => {
    throw new Error('Connection failed. Please check your configuration and internet connection.');
  });
}

// Elements
const roleSelect = document.getElementById('roleSelect');
const loadBtn = document.getElementById('loadBtn');
const customerCodeInput = document.getElementById('customerCode');
const qualificationSelect = document.getElementById('qualification');
const presentationSelect = document.getElementById('presentation');
const approveBtn = document.getElementById('approveBtn');
const declineBtn = document.getElementById('declineBtn');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const message = document.getElementById('message');
const loggedInAs = document.getElementById('loggedInAs');

const detailsSection = document.getElementById('detailsSection');
const d_region = document.getElementById('d_region');
const d_area = document.getElementById('d_area');
const d_location = document.getElementById('d_location');
const d_storeName = document.getElementById('d_storeName');
const d_contactPerson = document.getElementById('d_contactPerson');
const d_mobileNumber = document.getElementById('d_mobileNumber');
const d_outletCategory = document.getElementById('d_outletCategory');
const d_brandsStocked = document.getElementById('d_brandsStocked');
const d_purchaseFrequency = document.getElementById('d_purchaseFrequency');
const d_mainSupplier = document.getElementById('d_mainSupplier');
const d_distributorType = document.getElementById('d_distributorType');
const d_weldplusAwareness = document.getElementById('d_weldplusAwareness');
const d_additionalFeedback = document.getElementById('d_additionalFeedback');
const d_customerCode = document.getElementById('d_customerCode');

const salesRepEmailContainer = document.getElementById('salesRepEmailContainer');
const salesRepEmailInput = document.getElementById('salesRepEmail');

const salesRepAuthSection = document.getElementById('salesRepAuthSection');
const salesRepEmailAuth = document.getElementById('salesRepEmailAuth');
const salesRepPasswordAuth = document.getElementById('salesRepPasswordAuth');

const passwordModal = document.getElementById('passwordModal');
const modalOverlay = document.getElementById('modalOverlay');
const supervisorPasswordInput = document.getElementById('supervisorPasswordInput');
const submitPasswordBtn = document.getElementById('submitPasswordBtn');
const cancelPasswordBtn = document.getElementById('cancelPasswordBtn');
const passwordHint = document.getElementById('passwordHint');

const viewLeadsButtons = document.getElementById('viewLeadsButtons');
const viewGeneratedLeadsBtn = document.getElementById('viewGeneratedLeadsBtn');
const viewQualifiedLeadsBtn = document.getElementById('viewQualifiedLeadsBtn');
const leadsListSection = document.getElementById('leadsListSection');
const leadsListTitle = document.getElementById('leadsListTitle');
const leadsTableBody = document.getElementById('leadsTableBody');
const closeLeadsListBtn = document.getElementById('closeLeadsListBtn');

let currentLoadedLead = null;
let isSupervisorAuthenticated = false;
let supervisorPasswordCached = '';

// Show message
function showMessage(text, type) {
  message.className = 'message ' + (type === 'error' ? 'error show' : 'success show');
  message.textContent = text;
  setTimeout(() => message.classList.remove('show'), 6000);
}

// View Generated Leads
viewGeneratedLeadsBtn.addEventListener('click', function() {
  loading.classList.add('show');
  
  callGoogleScript('getAllGeneratedLeads')
    .then(res => {
      loading.classList.remove('show');
      
      if (!res || !res.success) {
        showMessage(res && res.message ? res.message : 'Unable to load leads', 'error');
        return;
      }
      
      displayLeadsList(res.data, 'Generated Leads');
    })
    .catch(err => {
      loading.classList.remove('show');
      showMessage('Error loading leads: ' + err.message, 'error');
    });
});

// View Qualified Leads
viewQualifiedLeadsBtn.addEventListener('click', function() {
  const salesRepEmail = salesRepEmailAuth.value.trim();
  const salesRepPassword = salesRepPasswordAuth.value.trim();
  
  if (!salesRepEmail || !salesRepPassword) {
    showMessage('Please enter your email and password first.', 'error');
    return;
  }
  
  loading.classList.add('show');
  
  callGoogleScript('getQualifiedLeadsBySalesRep', {
    salesRepEmail: salesRepEmail,
    salesRepPassword: salesRepPassword
  })
    .then(res => {
      loading.classList.remove('show');
      
      if (!res || !res.success) {
        showMessage(res && res.message ? res.message : 'Unable to load leads', 'error');
        return;
      }
      
      if (res.data.length === 0) {
        showMessage('No qualified leads found for your account.', 'error');
        return;
      }
      
      displayLeadsList(res.data, 'Qualified Leads (Approved)');
    })
    .catch(err => {
      loading.classList.remove('show');
      showMessage('Error loading leads: ' + err.message, 'error');
    });
});

// Display leads list
function displayLeadsList(leads, title) {
  leadsListTitle.textContent = title;
  leadsTableBody.innerHTML = '';
  
  leads.forEach(function(lead) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${lead.region || ''}</td>
      <td>${lead.area || ''}</td>
      <td>${lead.location || ''}</td>
      <td>${lead.storeName || ''}</td>
      <td>${lead.contactPerson || ''}</td>
      <td>${lead.mobileNumber || ''}</td>
      <td>${lead.outletCategory || ''}</td>
      <td>${lead.brandsStocked || ''}</td>
      <td>${lead.purchaseFrequency || ''}</td>
      <td>${lead.mainSupplier || ''}</td>
      <td>${lead.distributorType || ''}</td>
      <td>${lead.weldplusAwareness || ''}</td>
      <td>${lead.additionalFeedback || ''}</td>
      <td>${lead.customerCode || ''}</td>
    `;
    leadsTableBody.appendChild(row);
  });
  
  leadsListSection.classList.remove('hidden');
  detailsSection.classList.add('hidden');
}

// Close leads list
closeLeadsListBtn.addEventListener('click', function() {
  leadsListSection.classList.add('hidden');
});

// Load lead
loadBtn.addEventListener('click', function() {
  const code = customerCodeInput.value.trim();
  const role = roleSelect.value;

  if (!role) { 
    showMessage('Please select a role first.', 'error'); 
    return; 
  }

  if (!code) { 
    showMessage('Enter customer code to load.', 'error'); 
    return; 
  }

  let salesRepEmail = '';
  let salesRepPassword = '';
  
  if (role === 'SalesRep') {
    salesRepEmail = salesRepEmailAuth.value.trim();
    salesRepPassword = salesRepPasswordAuth.value.trim();
    
    if (!salesRepEmail) {
      showMessage('Please enter your Sales Rep email address.', 'error');
      return;
    }
    
    if (!salesRepPassword) {
      showMessage('Please enter your Sales Rep password.', 'error');
      return;
    }
  }

  loading.classList.add('show');
  
  callGoogleScript('getLeadStatus', {
    customerCode: code,
    role: role,
    salesRepEmail: salesRepEmail,
    salesRepPassword: salesRepPassword
  })
    .then(res => {
      loading.classList.remove('show');
      if (!res || !res.success) {
        showMessage(res && res.message ? res.message : 'Unable to load lead', 'error');
        return;
      }
      currentLoadedLead = res.data;
      qualificationSelect.value = currentLoadedLead.qualification || '';
      presentationSelect.value = currentLoadedLead.presentation || '';
      salesRepEmailInput.value = currentLoadedLead.salesRepEmail || '';

      d_region.textContent = currentLoadedLead.region || '';
      d_area.textContent = currentLoadedLead.area || '';
      d_location.textContent = currentLoadedLead.location || '';
      d_storeName.textContent = currentLoadedLead.storeName || '';
      d_contactPerson.textContent = currentLoadedLead.contactPerson || '';
      d_mobileNumber.textContent = currentLoadedLead.mobileNumber || '';
      d_outletCategory.textContent = currentLoadedLead.outletCategory || '';
      d_brandsStocked.textContent = currentLoadedLead.brandsStocked || '';
      d_purchaseFrequency.textContent = currentLoadedLead.purchaseFrequency || '';
      d_mainSupplier.textContent = currentLoadedLead.mainSupplier || '';
      d_distributorType.textContent = currentLoadedLead.distributorType || '';
      d_weldplusAwareness.textContent = currentLoadedLead.weldplusAwareness || '';
      d_additionalFeedback.textContent = currentLoadedLead.additionalFeedback || '';
      d_customerCode.textContent = currentLoadedLead.customerCode || '';

      detailsSection.classList.remove('hidden');
      leadsListSection.classList.add('hidden');

      if (role === 'Supervisor') {
        isSupervisorAuthenticated = false;
        supervisorPasswordCached = '';
        supervisorPasswordInput.value = '';
        passwordHint.style.display = 'none';
      }
      
      updateUiForRoleAndStatus();
      showMessage('Lead loaded successfully (row ' + currentLoadedLead.row + ')', 'success');
    })
    .catch(err => {
      loading.classList.remove('show');
      showMessage('Error loading lead: ' + err.message, 'error');
    });
});

// Update UI based on role
function updateUiForRoleAndStatus() {
  const role = roleSelect.value;
  const approval = (currentLoadedLead && currentLoadedLead.approval) ? currentLoadedLead.approval.toString() : '';

  qualificationSelect.disabled = true;
  presentationSelect.disabled = true;
  approveBtn.style.display = 'none';
  declineBtn.style.display = 'none';
  salesRepEmailContainer.classList.add('hidden');
  salesRepAuthSection.classList.add('hidden');
  viewLeadsButtons.classList.add('hidden');
  viewGeneratedLeadsBtn.classList.add('hidden');
  viewQualifiedLeadsBtn.classList.add('hidden');

  if (!role) return;

  if (role === 'Supervisor') {
    if (isSupervisorAuthenticated) {
      qualificationSelect.disabled = false;
      approveBtn.style.display = 'inline-block';
      declineBtn.style.display = 'inline-block';
      presentationSelect.disabled = true;
      salesRepEmailContainer.classList.remove('hidden');
      viewLeadsButtons.classList.remove('hidden');
      viewGeneratedLeadsBtn.classList.remove('hidden');
    } else {
      showPasswordModal();
    }
  } else if (role === 'SalesRep') {
    salesRepAuthSection.classList.remove('hidden');
    qualificationSelect.disabled = true;
    
    if (approval === 'Approved') {
      presentationSelect.disabled = false;
    }

    if (salesRepEmailAuth.value.trim() && salesRepPasswordAuth.value.trim()) {
      viewLeadsButtons.classList.remove('hidden');
      viewQualifiedLeadsBtn.classList.remove('hidden');
    }
  }
}

// Role change
roleSelect.addEventListener('change', function() {
  currentLoadedLead = null;
  detailsSection.classList.add('hidden');
  leadsListSection.classList.add('hidden');
  qualificationSelect.value = '';
  presentationSelect.value = '';
  updateUiForRoleAndStatus();
});

// Password modal
function showPasswordModal() {
  passwordModal.style.display = 'block';
  modalOverlay.style.display = 'flex';
  supervisorPasswordInput.value = '';
  supervisorPasswordInput.focus();
}

function hidePasswordModal() {
  passwordModal.style.display = 'none';
  modalOverlay.style.display = 'none';
}

cancelPasswordBtn.addEventListener('click', function() {
  hidePasswordModal();
  roleSelect.value = '';
  updateUiForRoleAndStatus();
});

submitPasswordBtn.addEventListener('click', function() {
  const pw = supervisorPasswordInput.value.trim();
  if (!pw) {
    passwordHint.textContent = 'Please enter the password.';
    passwordHint.style.display = 'block';
    return;
  }

  loading.classList.add('show');

  callGoogleScript('validateSupervisorPassword', { password: pw })
    .then(res => {
      loading.classList.remove('show');

      if (!res || !res.success) {
        passwordHint.textContent = (res && res.message) ? res.message : 'Invalid supervisor password.';
        passwordHint.style.display = 'block';
        return;
      }

      isSupervisorAuthenticated = true;
      supervisorPasswordCached = pw;
      hidePasswordModal();
      updateUiForRoleAndStatus();
      showMessage('Supervisor authenticated.', 'success');
    })
    .catch(err => {
      loading.classList.remove('show');
      passwordHint.textContent = 'Error: ' + err.message;
      passwordHint.style.display = 'block';
    });
});

// Approve button
approveBtn.addEventListener('click', function() {
  if (!currentLoadedLead || !isSupervisorAuthenticated) return;
  
  const code = customerCodeInput.value.trim();
  const qual = qualificationSelect.value;
  const salesEmail = salesRepEmailInput.value.trim();

  if (!qual) {
    showMessage('Please select a qualification status.', 'error');
    return;
  }

  submitBtn.disabled = true;
  loading.classList.add('show');

  callGoogleScript('updateQualificationBySupervisor', {
    customerCode: code,
    qualificationValue: qual,
    approvalAction: 'Approved',
    salesRepEmail: salesEmail,
    password: supervisorPasswordCached
  })
    .then(res => {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      
      if (res && res.success) {
        showMessage('Qualification approved.', 'success');
        // Reload
        loadBtn.click();
      } else {
        showMessage(res && res.message ? res.message : 'Error approving', 'error');
      }
    })
    .catch(err => {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      showMessage('Error: ' + err.message, 'error');
    });
});

// Decline button
declineBtn.addEventListener('click', function() {
  if (!currentLoadedLead || !isSupervisorAuthenticated) return;
  
  const code = customerCodeInput.value.trim();
  const qual = qualificationSelect.value;
  const salesEmail = salesRepEmailInput.value.trim();

  if (!qual) {
    showMessage('Please select a qualification status.', 'error');
    return;
  }

  submitBtn.disabled = true;
  loading.classList.add('show');

  callGoogleScript('updateQualificationBySupervisor', {
    customerCode: code,
    qualificationValue: qual,
    approvalAction: 'Declined',
    salesRepEmail: salesEmail,
    password: supervisorPasswordCached
  })
    .then(res => {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      
      if (res && res.success) {
        showMessage('Qualification declined.', 'success');
        loadBtn.click();
      } else {
        showMessage(res && res.message ? res.message : 'Error declining', 'error');
      }
    })
    .catch(err => {
      loading.classList.remove('show');
      submitBtn.disabled = false;
      showMessage('Error: ' + err.message, 'error');
    });
});

// Form submit
document.getElementById('leadForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const code = customerCodeInput.value.trim();
  if (!code || !currentLoadedLead) {
    showMessage('Load a lead first.', 'error');
    return;
  }

  const role = roleSelect.value;

  if (role === 'Supervisor') {
    if (!isSupervisorAuthenticated) {
      showMessage('Supervisor not authenticated.', 'error');
      return;
    }

    const qual = qualificationSelect.value;
    const salesEmail = salesRepEmailInput.value.trim();

    submitBtn.disabled = true;
    loading.classList.add('show');

    callGoogleScript('updateQualificationBySupervisor', {
      customerCode: code,
      qualificationValue: qual,
      approvalAction: '',
      salesRepEmail: salesEmail,
      password: supervisorPasswordCached
    })
      .then(res => {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        
        if (res && res.success) {
          showMessage('Qualification updated.', 'success');
          loadBtn.click();
        } else {
          showMessage(res && res.message ? res.message : 'Error updating', 'error');
        }
      })
      .catch(err => {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        showMessage('Error: ' + err.message, 'error');
      });
    return;
  }

  if (role === 'SalesRep') {
    const pres = presentationSelect.value;
    if (!pres) {
      showMessage('Select a presentation status.', 'error');
      return;
    }

    const salesRepEmail = salesRepEmailAuth.value.trim();
    const salesRepPassword = salesRepPasswordAuth.value.trim();

    if (!salesRepEmail || !salesRepPassword) {
      showMessage('Sales Rep credentials required.', 'error');
      return;
    }

    submitBtn.disabled = true;
    loading.classList.add('show');

    callGoogleScript('updatePresentationBySalesRep', {
      customerCode: code,
      presentationValue: pres,
      salesRepEmail: salesRepEmail,
      password: salesRepPassword
    })
      .then(res => {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        
        if (res && res.success) {
          showMessage('Presentation updated.', 'success');
          loadBtn.click();
        } else {
          showMessage(res && res.message ? res.message : 'Error updating', 'error');
        }
      })
      .catch(err => {
        loading.classList.remove('show');
        submitBtn.disabled = false;
        showMessage('Error: ' + err.message, 'error');
      });
  }
});