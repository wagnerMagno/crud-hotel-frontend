import React, { Component } from 'react';

import DashboardComponentStyled from './DashboardComponentStyled';
import { Button, Row, Col, Card, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'


class DashboardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listaPessoas: [],
      listaCheckin: []
    }


  }

  componentDidMount() {

    let listaPessoas = [
      { nome: "João da Silva", documento: "123456", telefone: "88888888" },
      { nome: "Maria de Souza", documento: "098766", telefone: "99999999" },
      { nome: "Pedro Saula", documento: "5678098", telefone: "77777777" },
      { nome: "Joana Santos", documento: "098321", telefone: "66666666" },
    ]

    new Date("2019/06/20")
    let listaCheckin = [];
    listaPessoas.forEach((p, i) => {
      let obj = {
        pessoa: p,
        dataEntrada: new Date("2019/06/" + 20 + i),
        dataSaida: new Date("2019/06/" + 20 + i + 5),
        adicionalVeiculo: (i % 2 === 1)
      };

      listaCheckin.push(obj);

    });

    this.setState({
      listaPessoas: listaPessoas,
      listaCheckin: listaCheckin
    })

  }


  render() {
    return (
      <DashboardComponentStyled>
        <div className="title">
          <p>
            Hotel X
          </p>
        </div>

        <div className="incluir-pessoa">
          <Button variant="primary" type="submit">
            Incluir pessoa
          </Button>

        </div>

        <Card className="novo-check-in">
          <Card.Header>Novo check in</Card.Header>
          <Card.Body>
            <Form
              noValidate
              onSubmit={e => this.saveExpense(e)}
            >

              <Form.Group as={Row} controlId="titulo">
                <Form.Label column sm="3">
                  Título
              </Form.Label>
                <Col sm="9">
                  <Form.Control controlId type="text" placeholder="Título" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="descricao">
                <Form.Label column sm="3">
                  Descrição
              </Form.Label>
                <Col sm="9">
                  <Form.Control type="text" controlId placeholder="Descrição" />
                </Col>
              </Form.Group>

              <Button variant="primary" type="submit">Salvar</Button>
            </Form>
          </Card.Body>
        </Card>

        <Card className="consultas">


          <Card.Header>Consultas</Card.Header>
          <Card.Body>
            <div>
              <Form.Label column sm="3">
                Filtrar por:
              </Form.Label>
              <Col sm="9">
                <div className="mb-3" style={{ marginTop: "8px" }} onChange={this.changeDivisaoDespesa}>
                  <Form.Check inline label="Pessoas ainda presentes" name="filtra-opr" value={true} type={"radio"} id={`inline-1`} />
                  <Form.Check inline label="Pessoas que já deixaram o hotel" name="filtra-opr" value={false} type={"radio"} id={`inline-1`} />
                </div>
              </Col>

              <Table responsive="sm">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Documento</th>
                    <th>Valor gasto (R$)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.listaCheckin.map((c, i) => {
                      return (
                        <tr>
                          <td>{c.pessoa.nome}</td>
                          <td>{c.pessoa.documento}</td>
                          <td>Table cell</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>

            </div>
          </Card.Body>
        </Card>

      </DashboardComponentStyled>
    )
  }
}

export default DashboardComponent;
