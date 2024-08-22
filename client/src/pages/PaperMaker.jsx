import * as React from 'react';

//import AddressForm from '../components/CheckoutAddressForm';
import PaperMakerForm from '../components/PaperMakerForm';
import CheckoutReview from '../components/CheckoutReview';
import styled from "styled-components";
import { mobile } from "../responsive";



const Halves = styled.div`
  display: flex;
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}

`;

const Adjust = styled.div`
  padding: 10vh
  
`;




const Checkout=()=> {
  
  return (
    <div>
        <Adjust>
            <PaperMakerForm/>
        </Adjust> 
    </div>
  );
}

export default Checkout;