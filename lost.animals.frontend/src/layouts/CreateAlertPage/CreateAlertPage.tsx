import { AddAnimalAlert } from './components/AddAnimalAlert';

export const CreateAlertPage = () => {


    

    return (
        <div className='container'>
            <div className='mt-5'>
                <h3>Create Animal Alert</h3>
                <nav>
                    <div className='nav nav-tabs' id='nav-tab' role='tablist'>
                        Create Alert
                    </div>
                </nav>
                <div className='tab-content' id='nav-tabContent'> 
                    <div className='tab-pane fade show active' id='nav-add-book' role='tabpanel'
                        aria-labelledby='nav-add-book-tab'>
                            <AddAnimalAlert/>
                    </div>
                </div>
            </div>
        </div>
    );
};
