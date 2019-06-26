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
    
    .button-submit{
        background-color: #337ab7;
    }

    .consultas{
        margin-bottom: 15px;
    }

    .paginador{
        border: 2px solid #f1f0ee !important;
        border-radius: 23px;
        height: 24px;
        font-size: 12px;
        color: #337ab7;
        width: 90px;
        padding-bottom: 1px !important;

        p{
            margin-top: -5px;
        }
    }

    .paginador:hoover{
        background-color: white !important;
    }

    .btn-outline-primary:hover {
        background-color: white;
    }
    .btn-outline-primary:focus {
        box-shadow: 0 0 0 0rem rgba(0,123,255,.5) !important;
    }

    .btn-outline-primary:not(:disabled):not(.disabled):active, .show>.btn-outline-primary.dropdown-toggle {
        color: #337ab7 !important;
        background-color: white !important;
    }


    .icon{
        width: 10px;
    }
`;

export default DashboardComponentStyled;

