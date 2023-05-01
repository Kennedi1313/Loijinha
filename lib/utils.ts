import axios from 'axios';
import X2JS from "x2js";

export const formatCurrency = (amount = 0, currency = 'BRL') =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumIntegerDigits: 2,
  }).format(amount / 100);

export const isClient = typeof window === 'object';

export const fetcher = (url: any) => axios.get(url).then(res => res.data);

export const calcFrete = async (destino: string) => {
  var x2js = new X2JS();
  const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Access-Control-Allow-Origin': '*'
  }
  const sedexObj = await axios.get(getUrlCorreios(destino, '04014'), {headers});
  const sedexJsonObj: any = x2js.xml2js(sedexObj.data);

  const pacObj = await axios.get(getUrlCorreios(destino, '04510'), {headers});
  const pacJsonObj: any = x2js.xml2js(pacObj.data);
  return {
    data: {
      sedex: {
        value: sedexJsonObj?.Servicos?.cServico?.Valor,
        estimate: sedexJsonObj?.Servicos?.cServico?.PrazoEntrega
      }, 
      pac: {
        value: pacJsonObj?.Servicos?.cServico?.Valor,
        estimate: pacJsonObj?.Servicos?.cServico?.PrazoEntrega
      }
    }
  };
}

function getUrlCorreios(destino: string, servico: string) {
  return `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?
    nCdEmpresa=
    &sDsSenha=
    &sCepOrigem=59091200
    &sCepDestino=${destino}
    &nVlPeso=1
    &nCdFormato=1
    &nVlComprimento=20
    &nVlAltura=5
    &nVlLargura=15
    &sCdMaoPropria=n
    &nVlValorDeclarado=0
    &sCdAvisoRecebimento=n
    &nCdServico=${servico}
    &nVlDiametro=0
    &StrRetorno=xml`;
}