
import { AccountPageComp } from '../AccountPageComp/AccountPageComp';

export const Feed = () => {
    var currentPage = localStorage.getItem('page');
    
    function renderPage() {
        switch (currentPage) {
            case 'Accounts':
                return <AccountPageComp />;
            default:
                return <AccountPageComp />;
        }
    }

    return renderPage();
}
