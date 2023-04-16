export default function convertToLatex(expression: string): string {
  const sqrtRegex = /sqrt\((.*?)\)/g;
  let latexExpression = expression.replace(sqrtRegex, '\\sqrt{$1}');
  const rootRegex = /(\w+)\^\(?\s*1\s*\/\s*(\d+)\s*\)?/g;
  latexExpression = latexExpression.replace(rootRegex, '\\sqrt[$2]{$1}');
  const powerParenthesesRegex = /(\w+)\^\((.*?)\)/g;
  latexExpression = latexExpression.replace(powerParenthesesRegex, '$1^{$2}');
  // ?Add additional conversions for other formats, if needed
  return latexExpression;
}