import styled from 'styled-components'


const DashboardComponentStyled = styled.div`

    width: 70%;
    margin-left: 15%;
    margin-top: 60px;
    
    .title{
        text-align: center;
        border: 3px solid #95b8ee;
        height: 62px;
        font-size: 18px;
        font-weight: 600;
        color: #5a5049;

        p{
            margin-top: 14px;
        }
    }
    
    .incluir-pessoa{
        margin-top: 10px;
        width: 96%;
        margin-left: 2%;
    }
    
    .novo-check-in{
        
    }
    
    .card{
        margin-top: 10px;
        width: 96%;
        margin-left: 2%;
        border: 2px solid #c9d1d5;
        border-radius: 6px;
        border-top: none;
    }

    .card-header{
        background-color: #337ab7;
        color: white;
    }
    
    button{
        background-color: #337ab7;
    }

`;

export default DashboardComponentStyled;

