import React, { useEffect } from 'react';
import './spinner.css';

const Spinner = () => {
    const refresh = () => {
        window.onload = function () {
            const preloader = document.querySelector('.page-loading');
            if (preloader) {
                preloader.classList.remove('active');
                setTimeout(() => {
                    preloader.remove();
                }, 2000);
            }
        };
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div>
            <div className="page-loading active">
                <div className="page-loading-inner">
                    <div className="page-spinner"></div>
                    <span className='text-primary'>Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
