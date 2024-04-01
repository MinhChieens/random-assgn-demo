# LTNC assignment

Cần cài thêm các extension (tui xài vscode, mn xài ide khác thì chịu khó kiếm nhá):

- ESLint
- Prettier (để format on save với bằng phím tắt riêng luôn, có sẵn settings.json cho vscode)
- Tailwind CSS Intellisense

Trong terminal, nhập `npm install` để cài package, `npm run dev` để chạy dev server

Source code mượn chủ yếu từ cái tutorial https://www.youtube.com/watch?v=B91wc5dCEBA&t=1405s

<details>
<summary>`.vscode/settings.json` (để sử dụng Prettier) </summary>
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.addMissingImports": "explicit"
  },
  "prettier.tabWidth": 2,
  "prettier.useTabs": false,
  "prettier.semi": true,
  "prettier.singleQuote": false,
  "prettier.jsxSingleQuote": false,
  "prettier.trailingComma": "es5",
  "prettier.arrowParens": "always",
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "vscode.css-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
</details>
