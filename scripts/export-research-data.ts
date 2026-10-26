import ts from 'typescript';
import { readFileSync, writeFileSync } from 'node:fs';
// Read-only extraction of the three existing, literal card arrays. No source rewrite.
const input = readFileSync('frontend/src/features/research/components/ResearchLanding.tsx', 'utf8');
const source = ts.createSourceFile('research.tsx', input, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function literal(node: ts.Expression): unknown {
  if (ts.isAsExpression(node)) return literal(node.expression);
  if (ts.isStringLiteral(node) || ts.isNumericLiteral(node)) return ts.isStringLiteral(node) ? node.text : Number(node.text);
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => literal(item as ts.Expression));
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(p => { if (!ts.isPropertyAssignment(p)) throw Error('Nonliteral source'); return [p.name.getText(source).replace(/^["']|["']$/g, ''), literal(p.initializer)]; }));
  throw Error('Only existing literal data can be exported.');
}
const result: Record<string, unknown> = {};
function visit(node: ts.Node) { if (ts.isVariableDeclaration(node) && ['goals', 'researchFields'].includes(node.name.getText(source)) && node.initializer) result[node.name.getText(source)] = literal(node.initializer); ts.forEachChild(node, visit); }
visit(source);
if (!result.goals || !result.researchFields) throw Error('Missing source arrays');
writeFileSync('frontend/src/data/research-cards.json', JSON.stringify(result, null, 2) + '\n');
const home: Record<string, unknown> = {};
for (const [file, variable, property] of [
  ['frontend/src/features/home/components/ProgrammeCatalog.tsx', 'MASTER_FIELDS', 'fields'],
  ['frontend/src/features/home/components/Research.tsx', 'RESEARCH_LINKS', 'researchLinks'],
  ['frontend/src/features/research/components/StrategicPartnersCarousel.tsx', 'strategicPartners', 'partners'],
]) {
  const text = readFileSync(file, 'utf8');
  const tree = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const asJson = (expr: ts.Expression): unknown => {
    if (ts.isAsExpression(expr)) return asJson(expr.expression);
    if (ts.isStringLiteral(expr)) return expr.text;
    if (ts.isArrayLiteralExpression(expr)) return expr.elements.map(e => asJson(e as ts.Expression));
    if (ts.isObjectLiteralExpression(expr)) return Object.fromEntries(expr.properties.map(p => { if (!ts.isPropertyAssignment(p) || !ts.isIdentifier(p.name)) throw Error('Nonliteral card'); return [p.name.text, asJson(p.initializer)]; }));
    throw Error('Nonliteral card');
  };
  function find(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(tree) === variable && node.initializer) home[property] = asJson(node.initializer);
    ts.forEachChild(node, find);
  }
  find(tree);
  if (!home[property]) throw Error(`Missing ${variable}`);
}
writeFileSync('frontend/src/data/home-cards.json', JSON.stringify({ fields: home.fields, researchLinks: home.researchLinks }, null, 2) + '\n');
writeFileSync('frontend/src/data/research-partners.json', JSON.stringify(home.partners, null, 2) + '\n');
