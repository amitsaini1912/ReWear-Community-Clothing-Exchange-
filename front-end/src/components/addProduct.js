import React, { useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [product, setProduct] = useState({
        title: '',
        description: '',
        category: 'Jacket',
        fabricType: '',
        size: 'M',
        condition: 'Good',
        tags: '',
        isAvailable: true,
        availabilityOptions: [],
        image: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/signup');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'availabilityOptions') {
            const options = [...product.availabilityOptions];
            if (checked) {
                options.push(value);
            } else {
                const index = options.indexOf(value);
                if (index > -1) options.splice(index, 1);
            }
            setProduct({ ...product, availabilityOptions: options });
        } else if (type === 'checkbox') {
            setProduct({ ...product, [name]: checked });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            alert('Please log in first.');
            return;
        }

        const body = {
            ...product,
            tags: product.tags.split(',').map(tag => tag.trim()),
            uploader: loggedInUser._id  // 👈 attach uploader ID
        };

        try {
            const res = await fetch('http://localhost:8080/add-item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const contentType = res.headers.get('content-type');

            if (res.ok) {
                let data;
                if (contentType && contentType.includes('application/json')) {
                    data = await res.json();
                    console.log('Success:', data);
                } else {
                    const text = await res.text();
                    console.log('Text response:', text);
                }

                alert('Product added successfully!');
                console.log(data);
                navigate('/profile'); // Redirect to home page
            } else {
                const errorText = await res.text();
                alert(`Failed: ${errorText}`);
            }

        } catch (err) {
            console.error('Error:', err);
            alert('Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '40px auto' }}>
            <h2>Add Product</h2>

            <input
                name="title"
                placeholder="Title"
                required
                value={product.title}
                onChange={handleChange}
            /><br /><br />

            <textarea
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
            /><br /><br />

            <select name="category" value={product.category} onChange={handleChange} required>
                {["Jacket", "Shirt", "Pant", "T-Shirt", "Lower"].map(opt => (
                    <option key={opt}>{opt}</option>
                ))}
            </select><br /><br />

            <input
                name="fabricType"
                placeholder="Fabric Type"
                value={product.fabricType}
                onChange={handleChange}
            /><br /><br />

            <select name="size" value={product.size} onChange={handleChange} required>
                {["S", "M", "L", "XL", "XXL"].map(size => (
                    <option key={size}>{size}</option>
                ))}
            </select><br /><br />

            <select name="condition" value={product.condition} onChange={handleChange} required>
                {["Fair", "Good", "Like New"].map(cond => (
                    <option key={cond}>{cond}</option>
                ))}
            </select><br /><br />

            <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={product.tags}
                onChange={handleChange}
            /><br /><br />

            <label>
                <input
                    type="checkbox"
                    name="isAvailable"
                    checked={product.isAvailable}
                    onChange={handleChange}
                />
                Available
            </label><br /><br />

            <fieldset>
                <legend>Availability Options</legend>
                {["Swap Request", "Redeem via Points"].map(option => (
                    <label key={option}>
                        <input
                            type="checkbox"
                            name="availabilityOptions"
                            value={option}
                            checked={product.availabilityOptions.includes(option)}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                ))}
            </fieldset><br />

            <label>Image URL:</label><br />
            <textarea
                name="image"
                placeholder="Enter image URL here"
                value={product.image}
                onChange={handleChange}
            /><br /><br />

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
