const getWeb3 = async () => {
    return new Promise((resolve, reject) => {
        window.addEventListener('load', function () {
            let web3 = window.ethereum;

            if (typeof web3 !== undefined) {
                window.ethereum.request({method: 'eth_requestAccounts'});
                resolve(web3);
            } else {
                console.error("Metamask no encontrado, instálelo por favor");
                reject();
            }
        });
    });
};

export default getWeb3;
