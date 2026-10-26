import ts from 'typescript';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
// Export only the existing literal DATA object; never evaluate application code.
const text = readFileSync('frontend/src/features/admissions/reference-engine.js', 'utf8');
const source = ts.createSourceFile('admissions.js', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
function literal(node: ts.Expression): unknown {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(item => literal(item as ts.Expression));
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
    if (!ts.isPropertyAssignment(property)) throw Error('Admissions source is no longer a literal object.');
    const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) ? property.name.text : property.name.getText(source);
    return [name, literal(property.initializer)];
  }));
  throw Error(`Unsupported admissions source: ${node.kind}`);
}
let data: unknown;
const editorial: Record<string, unknown> = {};
function visit(node: ts.Node) {
  if (ts.isVariableDeclaration(node) && node.initializer) {
    const name = node.name.getText(source);
    const initializer = ts.isBinaryExpression(node.initializer) && node.initializer.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken ? node.initializer.right : node.initializer;
    if (['DATA', 'sourceData'].includes(name) && ts.isObjectLiteralExpression(initializer)) data = literal(initializer);
    if (name === 'processSteps') editorial.masterProcess = literal(initializer);
    if (name === 'doctorProcessSteps') editorial.doctorProcess = literal(initializer);
    if (name === 'questions') editorial.masterFaq = (literal(initializer) as string[][]).map(([question, answer]) => ({ question, answer }));
    let parent: ts.Node | undefined = node.parent;
    while (parent && !ts.isFunctionDeclaration(parent)) parent = parent.parent;
    if (name === 'rows' && parent && ts.isFunctionDeclaration(parent) && parent.name?.text === 'renderDoctorFAQ') editorial.doctorFaq = (literal(initializer) as string[][]).map(([question, answer]) => ({ question, answer }));
  }
  ts.forEachChild(node, visit);
}
visit(source);
if (!data) throw Error('Missing existing admissions data.');
mkdirSync('docs/cms-audit', { recursive: true });
writeFileSync('docs/cms-audit/admissions-rule-data.json', JSON.stringify(data, null, 2) + '\n');
if (Object.keys(editorial).length !== 4) throw Error('Missing existing FAQ or process source.');
writeFileSync('frontend/src/features/admissions/editorial-content.json', JSON.stringify(editorial, null, 2) + '\n');
