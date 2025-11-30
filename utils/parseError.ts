/**
 * Utility para parsear errores de blockchain y Web3
 * Convierte errores técnicos en mensajes amigables para el usuario
 */

// Errores del contrato inteligente (custom errors de Solidity)
const CONTRACT_ERRORS: Record<string, string> = {
    // Errores de compra
    'BelowMinimumPurchase': 'belowMinimumPurchase',
    'InsufficientBalance': 'insufficientBalance',
    'InsufficientPayment': 'insufficientPayment',
    'InsufficientSupply': 'insufficientSupply',
    'InvalidAmount': 'invalidAmount',

    // Errores de proyecto
    'ProjectNotActive': 'projectNotActive',
    'ProjectNotFound': 'projectNotFound',
    'InvalidPrice': 'invalidPrice',
    'InvalidSupply': 'invalidSupply',
    'InvalidMinPurchase': 'invalidMinPurchase',
    'InvalidCreator': 'invalidCreator',

    // Errores de permisos
    'OnlyProjectCreator': 'onlyProjectCreator',
    'Unauthorized': 'unauthorized',
    'OwnableUnauthorizedAccount': 'unauthorizedAccount',
    'OwnableInvalidOwner': 'invalidOwner',

    // Errores de claim/revenue
    'NothingToClaim': 'nothingToClaim',
    'ClaimTransferFailed': 'claimTransferFailed',
    'NoFundsDeposited': 'noFundsDeposited',
    'NoTokensMinted': 'noTokensMinted',
    'WithdrawFailed': 'withdrawFailed',
    'RefundFailed': 'refundFailed',

    // Errores de pausa
    'EnforcedPause': 'contractPaused',
    'ExpectedPause': 'contractNotPaused',

    // Errores ERC1155
    'ERC1155InsufficientBalance': 'insufficientTokenBalance',
    'ERC1155InvalidApprover': 'invalidApprover',
    'ERC1155InvalidArrayLength': 'invalidArrayLength',
    'ERC1155InvalidOperator': 'invalidOperator',
    'ERC1155InvalidReceiver': 'invalidReceiver',
    'ERC1155InvalidSender': 'invalidSender',
    'ERC1155MissingApprovalForAll': 'missingApproval',

    // Seguridad
    'ReentrancyGuardReentrantCall': 'reentrancyDetected',
}

// Patrones comunes de errores de wallet/RPC
const WALLET_ERROR_PATTERNS: Array<{ pattern: RegExp | string; key: string }> = [
    // Usuario rechazó la transacción
    { pattern: /user rejected/i, key: 'userRejected' },
    { pattern: /user denied/i, key: 'userRejected' },
    { pattern: /rejected the request/i, key: 'userRejected' },
    { pattern: /user cancelled/i, key: 'userRejected' },
    { pattern: /request rejected/i, key: 'userRejected' },
    { pattern: 'ACTION_REJECTED', key: 'userRejected' },

    // Fondos insuficientes para gas
    { pattern: /insufficient funds/i, key: 'insufficientFunds' },
    { pattern: /not enough funds/i, key: 'insufficientFunds' },
    { pattern: /exceeds balance/i, key: 'insufficientFunds' },

    // Problemas de conexión
    { pattern: /network/i, key: 'networkError' },
    { pattern: /connection/i, key: 'connectionError' },
    { pattern: /disconnected/i, key: 'disconnected' },
    { pattern: /timeout/i, key: 'timeout' },

    // Gas
    { pattern: /gas/i, key: 'gasError' },
    { pattern: /out of gas/i, key: 'outOfGas' },
    { pattern: /gas limit/i, key: 'gasLimit' },

    // Nonce
    { pattern: /nonce/i, key: 'nonceError' },

    // Chain incorrecta
    { pattern: /chain/i, key: 'wrongChain' },
    { pattern: /network mismatch/i, key: 'wrongChain' },

    // Transacción fallida
    { pattern: /transaction failed/i, key: 'transactionFailed' },
    { pattern: /execution reverted/i, key: 'executionReverted' },
    { pattern: /reverted/i, key: 'executionReverted' },
]

export interface ParsedError {
    key: string           // Clave de traducción
    isUserAction: boolean // Si el usuario causó el error (ej: rechazó tx)
    rawMessage?: string   // Mensaje original para debugging
}

/**
 * Parsea un error de blockchain/Web3 y retorna una clave de traducción
 */
export function parseBlockchainError(error: Error | unknown): ParsedError {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const rawMessage = errorMessage

    // 1. Buscar errores personalizados del contrato en el mensaje
    for (const [contractError, translationKey] of Object.entries(CONTRACT_ERRORS)) {
        if (errorMessage.includes(contractError)) {
            return {
                key: translationKey,
                isUserAction: false,
                rawMessage
            }
        }
    }

    // 2. Buscar patrones de errores de wallet
    for (const { pattern, key } of WALLET_ERROR_PATTERNS) {
        const matches = typeof pattern === 'string'
            ? errorMessage.includes(pattern)
            : pattern.test(errorMessage)

        if (matches) {
            return {
                key,
                isUserAction: key === 'userRejected',
                rawMessage
            }
        }
    }

    // 3. Error desconocido
    return {
        key: 'unknownError',
        isUserAction: false,
        rawMessage
    }
}

/**
 * Obtiene un mensaje de error amigable usando las traducciones
 */
export function getErrorMessage(
    error: Error | unknown,
    t: (key: string) => string
): string {
    const parsed = parseBlockchainError(error)

    try {
        return t(parsed.key)
    } catch {
        // Si la traducción no existe, usar mensaje genérico
        return t('unknownError')
    }
}

/**
 * Verifica si el error fue causado por el usuario (ej: rechazó transacción)
 */
export function isUserCausedError(error: Error | unknown): boolean {
    const parsed = parseBlockchainError(error)
    return parsed.isUserAction
}
