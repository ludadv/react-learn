import React from 'react';
import {Route, Routes} from "react-router-dom";


import HomePage from "../Pages/HomePage";
import ContactPage from "../Pages/ContactPage";
import ImageListPage from "../Pages/ImageListPage/ImageListPage";
import Container from '@mui/material/Container';


class Body extends React.Component {
    render() {
        return (
            <Container>
                <div className='body'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/image-list' element={<ImageListPage />} />
                        <Route path='/contacts' element={<ContactPage />} />
                    </Routes>
                </div>
            </Container>
        );
    }
}

export default Body;
