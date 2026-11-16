"""
DesculpaGPT - Servidor Local Rápido
Inicia um servidor HTTP local e abre automaticamente o aplicativo no navegador.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Procura porta disponível caso 8000 esteja ocupada
    port = PORT
    server = None
    for attempt_port in range(PORT, PORT + 20):
        try:
            server = socketserver.TCPServer(("", attempt_port), Handler)
            port = attempt_port
            break
        except OSError:
            continue

    if not server:
        print("[ERRO] Não foi possível encontrar uma porta disponível.")
        sys.exit(1)

    url = f"http://localhost:{port}/index.html"
    print("=" * 60)
    print("       🛡️  DesculpaGPT — Sistema Operacional de Desculpas  🛡️")
    print("=" * 60)
    print(f" Servidor rodando em: {url}")
    print(" Abrindo no seu navegador padrão...")
    print(" Pressione Ctrl+C para encerrar o servidor.")
    print("=" * 60)

    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"Não foi possível abrir o navegador automaticamente: {e}")
        print(f"Por favor, abra manualmente o link: {url}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor encerrado com sucesso. Boas desculpas!")
        server.server_close()

if __name__ == "__main__":
    main()
