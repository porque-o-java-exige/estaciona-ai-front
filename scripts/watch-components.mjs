// Fica observando src/app/components/**/component.meta.json.
// A cada arquivo novo, editado ou removido, roda o gerador de novo.
// Deixe este script rodando num terminal separado, ao lado do "ng serve" —
// como ele reescreve um arquivo dentro de src/, o próprio Angular detecta
// a mudança e recompila sozinho, sem precisar reiniciar nada.
//
// Uso: node scripts/watch-components.mjs

import chokidar from 'chokidar';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GENERATOR = join(__dirname, 'generate-components-data.mjs');
const WATCH_GLOB = join(__dirname, '..', 'src', 'app', 'components', '**', 'component.meta.json');

function runGenerator() {
  try {
    execFileSync('node', [GENERATOR], { stdio: 'inherit' });
  } catch {
    // o próprio gerador já imprime o erro específico, só evita derrubar o watcher
  }
}

console.log('👀 Observando component.meta.json dentro de src/app/components/ ...');
console.log('   (deixe este terminal aberto enquanto trabalha; Ctrl+C pra parar)\n');

runGenerator(); // gera uma vez já ao iniciar, com o que já existir

chokidar
  .watch(WATCH_GLOB, { ignoreInitial: true })
  .on('add', (path) => {
    console.log(`\n🆕 Novo componente detectado: ${path}`);
    runGenerator();
  })
  .on('change', (path) => {
    console.log(`\n✏️  Meta atualizado: ${path}`);
    runGenerator();
  })
  .on('unlink', (path) => {
    console.log(`\n🗑️  Meta removido: ${path}`);
    runGenerator();
  });
