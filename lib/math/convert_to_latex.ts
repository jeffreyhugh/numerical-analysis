export default function convertToLatex(expression: string): string {
  const sqrtRegex = /sqrt\((.*?)\)/g;
  const rootRegex = /(\w+)\^\(?\s*1\s*\/\s*(\d+)\s*\)?/g;
  const powerParenthesesRegex = /(\w+)\^\((.*?)\)/g;
  let latexExpression = expression.replace(sqrtRegex, '\\sqrt{$1}');
  latexExpression = latexExpression.replace(rootRegex, '\\sqrt[$2]{$1}');
  latexExpression = latexExpression.replace(powerParenthesesRegex, '$1^{$2}');
  return latexExpression;
}
