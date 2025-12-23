import { Abi, Address } from "viem"

// IMPORTANTE: Actualiza esta dirección con la dirección de tu contrato desplegado
export const SOLAR_TOKEN_ADDRESS = "0x4C87d512B1F45C174AEc908b3C81B05A9841d883" as Address

export const SOLAR_TOKEN_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            }
        ],
        "name": "balanceOfBatch",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256[]",
                "name": "projectIds",
                "type": "uint256[]"
            }
        ],
        "name": "claimMultiple",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "name": "claimRevenue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "projectName",
                "type": "string"
            },
            {
                "internalType": "uint96",
                "name": "totalSupply",
                "type": "uint96"
            },
            {
                "internalType": "uint128",
                "name": "priceWei",
                "type": "uint128"
            },
            {
                "internalType": "uint96",
                "name": "minPurchase",
                "type": "uint96"
            }
        ],
        "name": "createProject",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "projectName",
                "type": "string"
            },
            {
                "internalType": "uint96",
                "name": "totalSupply",
                "type": "uint96"
            },
            {
                "internalType": "uint128",
                "name": "priceWei",
                "type": "uint128"
            },
            {
                "internalType": "uint96",
                "name": "minPurchase",
                "type": "uint96"
            }
        ],
        "name": "createProjectFor",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "energyKwhDelta",
                "type": "uint128"
            }
        ],
        "name": "depositRevenue",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            }
        ],
        "name": "getClaimableAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "claimable",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "projectIds",
                "type": "uint256[]"
            }
        ],
        "name": "getInvestorPortfolio",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "projectId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "claimableAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalClaimed",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NiKoSun.InvestorPosition[]",
                "name": "positions",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "projectIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "getInvestorPortfolioPaginated",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "projectId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenBalance",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "claimableAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalClaimed",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NiKoSun.InvestorPosition[]",
                "name": "positions",
                "type": "tuple[]"
            },
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "hasMore",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "name": "getProject",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint96",
                        "name": "totalSupply",
                        "type": "uint96"
                    },
                    {
                        "internalType": "uint96",
                        "name": "minted",
                        "type": "uint96"
                    },
                    {
                        "internalType": "uint96",
                        "name": "minPurchase",
                        "type": "uint96"
                    },
                    {
                        "internalType": "uint128",
                        "name": "priceWei",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint64",
                        "name": "createdAt",
                        "type": "uint64"
                    },
                    {
                        "internalType": "bool",
                        "name": "active",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint128",
                        "name": "totalEnergyKwh",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint48",
                        "name": "reserved1",
                        "type": "uint48"
                    },
                    {
                        "internalType": "uint128",
                        "name": "totalRevenue",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint128",
                        "name": "reserved2",
                        "type": "uint128"
                    },
                    {
                        "internalType": "uint256",
                        "name": "rewardPerTokenStored",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct NiKoSun.Project",
                "name": "project",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct NiKoSun.ProjectMetadata",
                "name": "meta",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "salesBalance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "availableSupply",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "name": "getProjectCreator",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "name": "getSalesBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getTotalSalesBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserProjects",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "getUserProjectsCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "offset",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "getUserProjectsPaginated",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "projectIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "total",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "hasMore",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "isApprovedForAll",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "isProjectCreator",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "metadata",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint96",
                "name": "amount",
                "type": "uint96"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextProjectId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "pendingRewards",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "projectSalesBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "projects",
        "outputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "uint96",
                "name": "totalSupply",
                "type": "uint96"
            },
            {
                "internalType": "uint96",
                "name": "minted",
                "type": "uint96"
            },
            {
                "internalType": "uint96",
                "name": "minPurchase",
                "type": "uint96"
            },
            {
                "internalType": "uint128",
                "name": "priceWei",
                "type": "uint128"
            },
            {
                "internalType": "uint64",
                "name": "createdAt",
                "type": "uint64"
            },
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            },
            {
                "internalType": "uint128",
                "name": "totalEnergyKwh",
                "type": "uint128"
            },
            {
                "internalType": "uint48",
                "name": "reserved1",
                "type": "uint48"
            },
            {
                "internalType": "uint128",
                "name": "totalRevenue",
                "type": "uint128"
            },
            {
                "internalType": "uint128",
                "name": "reserved2",
                "type": "uint128"
            },
            {
                "internalType": "uint256",
                "name": "rewardPerTokenStored",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            }
        ],
        "name": "rescueDust",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeBatchTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "newBaseURI",
                "type": "string"
            }
        ],
        "name": "setBaseURI",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "newTotalEnergy",
                "type": "uint128"
            },
            {
                "internalType": "string",
                "name": "reason",
                "type": "string"
            }
        ],
        "name": "setEnergy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            }
        ],
        "name": "setProjectStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "totalUserClaimed",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "newCreator",
                "type": "address"
            }
        ],
        "name": "transferProjectOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTokens",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "uint128",
                "name": "energyKwhDelta",
                "type": "uint128"
            }
        ],
        "name": "updateEnergy",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            }
        ],
        "name": "uri",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "userRewardPerTokenPaid",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawSales",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }
        ],
        "name": "ApprovalForAll",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "DustRescued",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "previousEnergy",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "newEnergy",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "reason",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "EnergySet",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "energyDelta",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "totalEnergy",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "EnergyUpdated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint96",
                "name": "totalSupply",
                "type": "uint96"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "priceWei",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint96",
                "name": "minPurchase",
                "type": "uint96"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "ProjectCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousCreator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newCreator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "ProjectOwnershipTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "bool",
                "name": "active",
                "type": "bool"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "ProjectStatusChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "investor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalClaimed",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "RevenueClaimed",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "depositor",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint128",
                "name": "energyKwh",
                "type": "uint128"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newRewardPerToken",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "RevenueDeposited",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "SalesWithdrawn",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "buyer",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint96",
                "name": "amount",
                "type": "uint96"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "totalPaid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "TokensMinted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "values",
                "type": "uint256[]"
            }
        ],
        "name": "TransferBatch",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "projectId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint64",
                "name": "timestamp",
                "type": "uint64"
            }
        ],
        "name": "TransferExecuted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "TransferSingle",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "URI",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "BatchSizeTooLarge",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint96",
                "name": "minimum",
                "type": "uint96"
            }
        ],
        "name": "BelowMinimumPurchase",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ClaimTransferFailed",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "needed",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ERC1155InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "approver",
                "type": "address"
            }
        ],
        "name": "ERC1155InvalidApprover",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "idsLength",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "valuesLength",
                "type": "uint256"
            }
        ],
        "name": "ERC1155InvalidArrayLength",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }
        ],
        "name": "ERC1155InvalidOperator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "receiver",
                "type": "address"
            }
        ],
        "name": "ERC1155InvalidReceiver",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "ERC1155InvalidSender",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ERC1155MissingApprovalForAll",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "EnforcedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ExpectedPause",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientBalance",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientPayment",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InsufficientSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidAmount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidCreator",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidMinPurchase",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidPrice",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "InvalidSupply",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoFundsDeposited",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NoTokensMinted",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NothingToClaim",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "OnlyProjectCreator",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "OwnableInvalidOwner",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "OwnableUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ProjectNotActive",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ProjectNotFound",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "ReentrancyGuardReentrantCall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RefundFailed",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "RewardIncreaseTooSmall",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "Unauthorized",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "WithdrawFailed",
        "type": "error"
    }
] as Abi