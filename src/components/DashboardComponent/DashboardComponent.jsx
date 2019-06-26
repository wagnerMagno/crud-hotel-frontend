import React, { Component } from 'react';

import DashboardComponentStyled from './DashboardComponentStyled';
import { Button, Row, Col, Card, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'


import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import setaDir from './images/seta-direita.svg'
import setaEsq from './images/seta-esquerda.svg'

registerLocale('pt', pt);


class DashboardComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      listaPessoas: [],
      listaCheckin: [],
      isIncluirPessoa: false,
      isPessoasPresente: true,
      listFiltro: [],
      dateEntrada: new Date(),
      dateSaidaChange: new Date(),
      pessoa: "",
      possuiVeiculo: false,
      paginador: 0
    }

    this.isIncluirPessoa = this.isIncluirPessoa.bind(this)
    this.incluirPessoa = this.incluirPessoa.bind(this)
    this.changePessoa = this.changePessoa.bind(this)
    this.dateChange = this.dateChange.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
    this.getListaPessoa = this.getListaPessoa.bind(this)
    this.adicionarCheckin = this.adicionarCheckin.bind(this)
    this.dateSaidaChange = this.dateSaidaChange.bind(this)
    this.changepossuiVeiculo = this.changepossuiVeiculo.bind(this)
    this.decrement = this.decrement.bind(this)
    this.increment = this.increment.bind(this)


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
        dataEntrada: new Date("2019/06/" + (20 + i)),
        dataSaida: new Date("2019/06/" + (20 + i + 5)),
        adicionalVeiculo: (i % 2 === 1)
      };

      listaCheckin.push(obj);

    });

    let dateAux = new Date();

    dateAux.setDate(this.state.dateEntrada.getDate() + 1)
    this.setState({
      listaPessoas: listaPessoas,
      listaCheckin: listaCheckin,
      dateSaidaChange: dateAux
    })

  }

  isIncluirPessoa() {
    this.setState({
      isIncluirPessoa: !this.state.isIncluirPessoa
    })
  }

  handleChangeSelect = (pessoa) => {
    this.setState({ pessoa });
  }

  incluirPessoa(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    let listaPessoas = this.state.listaPessoas;

    let obj = { nome: form.elements[0].value, documento: form.elements[1].value, telefone: form.elements[2].value };
    listaPessoas.push(obj);

    this.setState({
      listaPessoas: listaPessoas,
      isIncluirPessoa: false
    })
  }

  adicionarCheckin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity() || !this.state.pessoa.value) {
      return;
    }

    let listaCheckin = this.state.listaCheckin;
    let pessoa = {};
    for (let i = 0; i < this.state.listaPessoas.length; i++) {
      const p = this.state.listaPessoas[i];
      if (p.documento === this.state.pessoa.value) {
        pessoa = p;
        break;
      }
    }

    let dataEntrada = form.elements[0].value;
    let dataSaida = form.elements[1].value;


    let obj = {
      pessoa: pessoa,
      dataEntrada: new Date(`${dataEntrada.substring(6, 10)}/${dataEntrada.substring(3, 5)}/${dataEntrada.substring(0, 2)} ${dataEntrada.substring(12, 18)}`),
      dataSaida: new Date(`${dataSaida.substring(6, 10)}/${dataSaida.substring(3, 5)}/${dataSaida.substring(0, 2)} ${dataSaida.substring(12, 18)}`),
      adicionalVeiculo: form.elements[3].checked
    };

    listaCheckin.push(obj);

    let dateAux = new Date();
    dateAux.setDate((new Date()).getDate() + 1)

    this.setState({
      listaCheckin: listaCheckin,
      dateEntrada: new Date(),
      dateSaidaChange: dateAux,
      pessoa: "",
      possuiVeiculo: false
    })
  }

  changePessoa(event) {
    this.setState({
      isPessoasPresente: (event.target.value === "true"),
      paginador: 0
    })
  }

  changepossuiVeiculo(event) {
    this.setState({
      possuiVeiculo: (event.target.checked),
    })
  }

  getListFiltro() {
    let lista = [];

    this.state.listaCheckin.forEach(c => {

      if (this.state.isPessoasPresente && c.dataSaida > new Date()) {
        lista.push(c);
      } else if (!this.state.isPessoasPresente && c.dataSaida < new Date()) {
        lista.push(c);
      }
    });

    let l = [];
    for (let i = this.state.paginador * 5; i < (this.state.paginador + 1) * 5; i++) {
      const p = lista[i];
      if (p) {
        l.push(p);
      }
    }

    return l;
  }

  dateChange(date) {

    let dateAux = new Date();
    dateAux.setDate(date.getDate() + 1)

    this.setState({
      dateEntrada: date,
      dateSaidaChange: dateAux
    });
  }
  dateSaidaChange(date) {
    this.setState({
      dateSaidaChange: date
    });
  }

  getListaPessoa() {
    let lista = [];
    this.state.listaPessoas.forEach(p => {
      lista.push({ label: p.nome + " - " + p.documento, value: p.documento });
    });
    return lista;
  }

  decrement() {
    if (this.state.paginador - 1 < 0) {
      return;
    }
    this.setState({ paginador: this.state.paginador - 1 })
  }
  increment() {
    if (this.getListFiltro().length < 5) {
      return;
    }
    this.setState({ paginador: this.state.paginador + 1 })
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
          <Button className="button-submit" variant="primary" type="submit" onClick={this.isIncluirPessoa}>
            {this.state.isIncluirPessoa ? "Cancelar inclusão de pessoa" : "Incluir pessoa"}
          </Button>
          {
            this.state.isIncluirPessoa ?

              <Card>
                <Card.Header>Incluir Pessoa</Card.Header>
                <Card.Body>
                  <Form
                    noValidate
                    onSubmit={e => this.incluirPessoa(e)}
                  >

                    <Form.Group as={Row} controlId="nome">
                      <Form.Label column sm="3">
                        Nome
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control required controlId type="text" placeholder="Nome" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="documento">
                      <Form.Label column sm="3">
                        Documento
                  </Form.Label>
                      <Col sm="9">
                        <Form.Control required type="text" controlId placeholder="Documento" />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="telefone">
                      <Form.Label column sm="3">
                        Telefone
                  </Form.Label>
                      <Col sm="9">
                        <Form.Control required type="text" controlId placeholder="telefone" />
                      </Col>
                    </Form.Group>

                    <Button className="button-submit" variant="primary" type="submit">Incluir</Button>
                  </Form>
                </Card.Body>
              </Card>

              : ""
          }
        </div>

        <Card className="novo-check-in">
          <Card.Header>Novo check in</Card.Header>
          <Card.Body>
            <Form
              noValidate
              onSubmit={e => this.adicionarCheckin(e)}
            >
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="dataHoraEntrada">
                  <Form.Label column sm="12">
                    Data/hora de entrada
                  </Form.Label>
                  <Col sm="12">

                    <DatePicker required={true} className="form-control"
                      selected={this.state.dateEntrada}
                      onChange={this.dateChange}
                      minDate={new Date()}
                      locale="pt"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="time"
                      dateFormat="dd/MM/yyyy - HH:MM "
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="descricao">
                  <Form.Label column sm="12">
                    Data/hora de saída
                  </Form.Label>
                  <Col sm="12">
                    <DatePicker required={true} className="form-control"
                      selected={this.state.dateSaidaChange}
                      minDate={this.state.dateEntrada}
                      onChange={this.dateSaidaChange}
                      locale="pt"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={1}
                      timeCaption="time"
                      dateFormat="dd/MM/yyyy - HH:MM "
                    />
                  </Col>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} md="6" controlId="pessoa">
                  <Form.Label column sm="12">
                    Pessoa
                  </Form.Label>
                  <Col sm="12">
                    <Select
                      required
                      value={this.state.pessoa}
                      onChange={this.handleChangeSelect}
                      options={this.getListaPessoa()}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="possuiVeiculo">
                  <Form.Check onClick={this.changepossuiVeiculo}
                    checked={this.state.possuiVeiculo}
                    style={{ marginTop: '50px', marginLeft: "20px" }}
                    label="Possui veículo"
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group as={Col} md="6" >
                <Button className="button-submit" variant="primary" type="submit">Salvar</Button>
              </Form.Group>

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
                <div className="mb-3" style={{ marginTop: "8px" }} onChange={this.changePessoa}>
                  <Form.Check inline checked={this.state.isPessoasPresente} label="Pessoas ainda presentes" name="filtra-opr" value={true} type={"radio"} id={`inline-1`} />
                  <Form.Check inline checked={!this.state.isPessoasPresente} label="Pessoas que já deixaram o hotel" name="filtra-opr" value={false} type={"radio"} id={`inline-1`} />
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
                    this.getListFiltro().map((c, i) => {

                      function calulaValorGasto(obj) {
                        let diasFds = 0;
                        let diasSemana = 0;

                        let date = new Date(obj.dataEntrada.getTime());


                        do {
                          if (date.getDay() === 6 || date.getDay() === 0) {
                            diasFds++;
                          } else {
                            diasSemana++;
                          }
                          date.setDate(date.getDate() + 1);
                        } while (date.getMonth() + "/" + date.getDate() !== c.dataSaida.getMonth() + "/" + c.dataSaida.getDate());

                        if (c.dataSaida.getHours() + ":" + c.dataSaida.getMinutes() > "16:30") {
                          if (c.dataSaida.getDay() === 6 || c.dataSaida.getDay() === 0) {
                            diasFds++;
                          } else {
                            diasSemana++;
                          }
                        }

                        let valorSemana = ((diasSemana * 120) + (obj.adicionalVeiculo ? diasSemana * 15 : 0));
                        let valorFds = ((diasFds * 150) + (obj.adicionalVeiculo ? diasFds * 20 : 0));

                        return (valorSemana + valorFds) + ",00";
                      }

                      return (
                        <tr>
                          <td>{c.pessoa.nome}</td>
                          <td>{c.pessoa.documento}</td>
                          <td>{calulaValorGasto(c)} </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </Table>

              <div>
                <Button style={{ marginRight: "12px" }} className="paginador" onClick={() => this.decrement()} variant="outline-primary">
                  <p>
                    <img style={{ marginRight: "4px"}} className="icon" alt="" src={setaEsq} />
                    Previous
                  </p>
                </Button>
                <Button className="paginador" variant="outline-primary" onClick={() => this.increment()}>
                  <p>
                    Next
                    <img style={{ marginLeft: "5px"}} className="icon" alt="" src={setaDir} />
                  </p>
                </Button>

              </div>
            </div>
          </Card.Body>
        </Card>

      </DashboardComponentStyled>
    )
  }
}

export default DashboardComponent;
