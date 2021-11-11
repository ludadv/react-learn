import React from 'react';
import {Route, Routes} from "react-router-dom";


import HomePage from "../Pages/HomePage";
import ContactPage from "../Pages/ContactPage";
import ImageListPage from "../Pages/ImageListPage/ImageListPage";
import Blog from "../Pages/Blog";
import Container from '@mui/material/Container';


class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/image-list' element={<ImageListPage />} />
                        <Route path='/contact' element={<ContactPage />} />
                        <Route path='/blog' element={<Blog />} />
                    </Routes>
                </Container>
            </div>
        );
    }
}

export default Body;
