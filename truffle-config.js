module.exports = {
    contracts_build_directory: "src/artifacts",
    networks: {
        development: {
            host: 'localhost',
            port: 7545,
            network_id: '*',
            gas: 5200000
        }
    }, compilers: {
        solc: {
            version: "0.8.6"
        }
    }
}
