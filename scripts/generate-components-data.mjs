// Varre src/app/components/ procurando arquivos "component.meta.json"
// e gera src/app/interfaces/component-data.generated.ts a partir deles.
//
// Uso manual:   node scripts/generate-components-data.mjs
// Uso ao vivo:  node scripts/watch-components.mjs   (roda isso sozinho a cada mudança)

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COMPONENTS_ROOT = join(__dirname, '..', 'src', 'app', 'components');
const OUTPUT_FILE = join(__dirname, '..', 'src', 'app', 'interfaces', 'component-data.generated.ts');

const REQUIRED_FIELDS = ['id', 'name', 'description', 'category', 'longDescription', 'examples'];
const VALID_CATEGORIES = ['atoms', 'molecules', 'organisms'];
const META_FILENAME = 'component.meta.json';

function findMetaFiles(dir) {
  const results = [];
  if (!existsSync(dir)) {
    return results;
  }
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      results.push(...findMetaFiles(fullPath));
    } else if (entry === META_FILENAME) {
      results.push(fullPath);
    }
  }
  return results;
}

function loadComponents() {
  const metaFiles = findMetaFiles(COMPONENTS_ROOT);
  const components = [];
  const seenIds = new Set();
  let hadError = false;

  for (const filePath of metaFiles) {
    let data;
    try {
      data = JSON.parse(readFileSync(filePath, 'utf-8'));
    } catch {
      console.error(`❌ JSON inválido em: ${filePath}`);
      hadError = true;
      continue;
    }

    const missing = REQUIRED_FIELDS.filter((field) => !(field in data));
    if (missing.length > 0) {
      console.error(`❌ ${filePath} está sem os campos: ${missing.join(', ')}`);
      hadError = true;
      continue;
    }
    if (!VALID_CATEGORIES.includes(data.category)) {
      console.error(
        `❌ ${filePath} tem category inválida: "${data.category}" (use atoms, molecules ou organisms)`
      );
      hadError = true;
      continue;
    }
    if (seenIds.has(data.id)) {
      console.error(`❌ id duplicado "${data.id}" encontrado em: ${filePath}`);
      hadError = true;
      continue;
    }

    seenIds.add(data.id);
    components.push({
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      longDescription: data.longDescription,
      examples: data.examples,
    });
  }

  components.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  return { components, hadError };
}

function writeOutput(components) {
  const header = `// ⚠️ ARQUIVO GERADO AUTOMATICAMENTE — NÃO EDITE NA MÃO.
// Gerado por scripts/generate-components-data.mjs a partir dos arquivos
// "component.meta.json" encontrados dentro de src/app/components/.
//
// Pra adicionar um componente novo na Home, crie uma pasta em
// src/app/components/{atoms|molecules|organisms}/seu-componente/
// com um "component.meta.json" dentro. Não edite este arquivo direto,
// suas mudanças serão sobrescritas na próxima geração.

import { ComponentData } from './component-data.interface';

export const COMPONENTS_DATA: ComponentData[] = `;

  const body = JSON.stringify(components, null, 2);
  writeFileSync(OUTPUT_FILE, `${header}${body};\n`, 'utf-8');
}

const { components, hadError } = loadComponents();
writeOutput(components);

console.log(
  `✅ ${components.length} componente(s) gerado(s) em src/app/interfaces/component-data.generated.ts`
);

if (hadError) {
  console.error('⚠️  Alguns component.meta.json tinham problemas e foram ignorados (veja acima).');
  process.exitCode = 1;
}
