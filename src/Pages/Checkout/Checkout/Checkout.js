import React from 'react';
import { useParams } from 'react-router-dom';
import UseServiceDetails from '../../../hooks/UseServiceDetails/UseServiceDetails';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Checkout = () => {
    const { serviceId } = useParams();
    const [service] = UseServiceDetails(serviceId);
    const [user] = useAuthState(auth);

    const handleSubmit = event => {
        event.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
    }
    return (
        <div>
            <h2>Please Checkout your booking: {service.name}</h2>

            <form onSubmit={handleSubmit} className='w-75 mx-auto'>
                <input className=' w-100 mb-3 me-auto' value={user.displayName} type="text" name='name' placeholder='Name' required readOnly disabled />
                <br />
                <input className=' w-100 mb-3 mx-auto' value={user.email} type="email" name='email' placeholder='Email' required readOnly disabled />
                <br />
                <input className='w-100  mb-3 mx-auto' value={service.name} type="text" name='service' placeholder='Service' required readOnly disabled />
                <br />
                <input className='w-100  mb-3 mx-auto' type="text" name='phone' placeholder='Phone' />
                <br />
                <input className=' w-100 btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;