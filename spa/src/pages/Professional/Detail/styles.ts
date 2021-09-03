import styled from 'styled-components';
import { shade } from 'polished';



export const Container = styled.div`
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;

    header{
        display: flex;
        align-items: center;
    }

    header img{
        max-width: 300px;
        height: 50px;
    }
    span{
        font-size: 20px;
        margin-left: 24px;
    }
    header a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        height: 40px;
        line-height: 40px;
        padding: 10px 5px;
    
        width: 260px;
        margin-left: auto;
        margin-top: 0;
        height: 60px;
        background: #737373;
        border-radius: 10px;
        color: #737373;

        &: hover {
            background: ${shade(0.2, '#737373')};
        }
    }
    

    .detail{
        margin: 80px auto;
        padding: 64px;
        max-width: 730px;
        background: #2f294f;
        border-radius: 8px;
        color: white;
        display: flex;
        flex-direction: column;
    }

    .detail fieldset{
        margin-top: 10px;
        min-inline-size: auto;
        border: 0;
    }

    .detail legend{
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 40px;
    }

    .detail legend h2{
        font-size: 24px;
        
    }
    .detail div{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 20px;
    }
    
    .detail p{
        margin-bottom: 20px;
    }
    
    

`;
