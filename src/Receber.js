import { ethers } from "ethers"
import { useEffect } from "react";

const Receber = () => {


  useEffect(() => {

    window.ethereum.on('chainChanged', () => {
      console.log("mudou de rede");
    });

  },[])

  const handleClick = async () => {

    const endereco = "0xD4AB1a62E88314726bff3fd311c6Acf63534eDF9";
    const ABI = [
      "function receber(address lojista, uint numPedido) public payable"
    ]
    
    const provider = new ethers.providers.Web3Provider(window.ethereum)
//    const provider2 = ethers.providers.JsonRpcProvider("https://polygon-mainnet.g.alchemy.com/v2/CUoUJMqqy29kX4wUDy3boDib6BepxrWy")



    const signer = await provider.getSigner()
    console.log(signer)


    const contrato = new ethers.Contract(endereco, ABI, signer)
    const retorno = await contrato.receber("0x27E0155021E63842aFb79F99da8B9592F429f614", 100, { value: ethers.utils.parseUnits("0.01", "ether") })
    console.log(retorno)
    const confirmacao = await retorno.wait(3)
    console.log("confirmou", confirmacao)

  }

  const pegaId = async () => {
    await window.ethereum.request({method: 'wallet_switchEthereumChain', params: [{chainId: '0x4'}]})
  }

  const cadastraRede = async () => {
    await window.ethereum.request({method: 'wallet_addEthereumChain', params: [{chainId: '0xAA36A7', chainName:'Sepolia', nativeCurrency: {name:'Ether', symbol:'ETH', decimals: 18}, rpcUrls: ['https://rpc.sepolia.dev']}]})
  }

  return (
    <div>
      <button onClick={handleClick}>Clicar</button>
      <button onClick={pegaId}>Pega Id</button>
      <button onClick={cadastraRede}>Cadastrar Rede</button>   
    </div>
  )
}
export default Receber