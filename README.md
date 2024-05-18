# LTNC assignment

Cần cài thêm các extension (tui xài vscode, mn xài ide khác thì chịu khó kiếm nhá):

-  ESLint
-  Prettier (để format on save với bằng phím tắt riêng luôn, có sẵn settings.json cho vscode)
-  Tailwind CSS Intellisense

Trong terminal, nhập `npm install` để cài package, `npm run dev` để chạy dev server.

Trước mắt thì mn vô Home, đăng nhập vào tài khoản admin (gmail admin@gmail.com password 111111 (pass mặc định của mấy tài khoản)) rồi xem và viết báo cáo cho mấy trang đã hoàn tất. Mn có thể thêm xoá dữ liệu mấy trang đã hoàn tất, trừ trang Doctor List.

Các trang được xem như đã hoàn tất (có thể bắt đầu viết báo cáo)

-  Home (/)
-  Doctor List (/admin/listDoctors)
-  Medical Device (/admin/devices)
-  Medicines (/admin/medicines)
-  Staff (/admin/staff)

<details>
<summary><code>.vscode/settings.json</code> (để sử dụng Prettier) </summary>

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
