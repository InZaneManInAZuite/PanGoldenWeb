const configObj = {
    userApiUrl: 'http://localhost:5028/user',
    accountApiUrl: 'http://localhost:5028/account',
    transactionApiUrl: 'http://localhost:5028/transaction',
    apiUrl: 'http://localhost:5028',
    
    pathUrl: 'http://localhost:5173',
  };

  if (process.env.NODE_ENV === 'production') {
    configObj.userApiUrl = 'https://pangolden-backend-dgh8hkgmbycea8e5.australiasoutheast-01.azurewebsites.net/user';
    configObj.accountApiUrl = 'https://pangolden-backend-dgh8hkgmbycea8e5.australiasoutheast-01.azurewebsites.net/account';
    configObj.transactionApiUrl = 'https://pangolden-backend-dgh8hkgmbycea8e5.australiasoutheast-01.azurewebsites.net/transaction';
    configObj.apiUrl = 'https://pangolden-backend-dgh8hkgmbycea8e5.australiasoutheast-01.azurewebsites.net/';
    
    configObj.pathUrl = '';
  }

const config = configObj;
  


  
export default config;