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
        color: #FFF;

        &: hover {
            background: ${shade(0.2, '#737373')};
        }
    }

    


    h1{
        margin-top: 80px;
        margin-bottom: 24px;
    }

    div{
        display: grid;
        
    }
    div a{
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        font-family: Arial;

        display: block;
        height: 40px;
        line-height: 40px;
        padding: 10px 5px;
    
        width: 260px;
        margin-top: 0;
        margin-bottom: 20px;
        height: 60px;
        background: #b38f00;
        border-radius: 10px;
        color: #FFF;

        &: hover {
            background: ${shade(0.2, '#b38f00')};  
        }
    }

    table {
        border-radius: 8px;
        width: 100%;
        background-color: #000000;
      }

      td, th {
        border: #00cc66;
        background-color: #737373;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #737373;
      }

      .actionDetailBtn {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #006699;

        &: hover {
            background: ${shade(0.2, '#006699')};  
        }
    }

      .actionEditBtn {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #b38f00;

        &: hover {
            background: ${shade(0.2, '#b38f00')};  
        }
    }

      .actionDelBtn {
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;
        background: #990033;

        &: hover {
            background: ${shade(0.2, '#990033')};  
        }
    }
    
    
}
`;