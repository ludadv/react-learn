import React from 'react';
import {Route, Routes} from "react-router-dom";

import HomePage from "../Pages/HomePage";
import ContactPage from "../Pages/ContactPage";
import ImageListPage from "../Pages/ImageListPage";

class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/image-list' element={<ImageListPage />} />
                    <Route path='/contacts' element={<ContactPage />} />
                </Routes>
            </div>
        );
    }
}

export default Body;
