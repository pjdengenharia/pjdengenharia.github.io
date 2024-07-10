<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Função para limpar os dados de entrada
    function sanitize_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        return $data;
    }

    // Validação e sanitização
    $nome = sanitize_input($_POST['nome']);
    $email = filter_var(sanitize_input($_POST['email']), FILTER_VALIDATE_EMAIL);
    $tipo = sanitize_input($_POST['tipo']);
    $mensagem = sanitize_input($_POST['mensagem']);

    // Verificar se todos os campos estão preenchidos corretamente
    if (empty($nome) || empty($email) || empty($tipo) || empty($mensagem)) {
        echo "Todos os campos são obrigatórios.";
        exit;
    }

    if (!$email) {
        echo "Endereço de email inválido.";
        exit;
    }

    // Prevenção contra injeção de cabeçalhos de email
    $injection_patterns = array("/(content-type|bcc:|cc:|to:)/i");
    foreach ($injection_patterns as $pattern) {
        if (preg_match($pattern, $email) || preg_match($pattern, $nome) || preg_match($pattern, $tipo) || preg_match($pattern, $mensagem)) {
            echo "Entrada inválida detectada.";
            exit;
        }
    }

    // Enviar email
    $to = "pjdengenhariaeservicos@gmail.com";
    $subject = "Contato do site - " . $tipo;
    $body = "Nome: $nome\nEmail: $email\nTipo de Pedido: $tipo\n\nMensagem:\n$mensagem";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Email enviado com sucesso!";
    } else {
        echo "Falha no envio do email.";
    }
} else {
    echo "Método de solicitação inválido.";
}
?>
