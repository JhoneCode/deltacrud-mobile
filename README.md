<div align="center"><image src="https://user-images.githubusercontent.com/86243538/182903587-6e0392e4-d94e-4303-a1e3-eb000631ac97.png"/></br>
<p align="center">
 <a href="#-Sobre">Sobre</a> •
 <a href="#-roadmap">Roadmap</a> • 
 <a href="#-tecnologias">Tecnologias</a> • 
 <a href="#-instruções">Instruções</a> • 
 <a href="#-resultados">Resultados</a> •
 <a href="#-autor">Autor</a>
</p>
  <img src="https://img.shields.io/static/v1?label=APK%20size&message=64.9MB&color=b6b7f6&style=for-the-badge&logo=android"/>
  <img src="https://img.shields.io/static/v1?label=React%20Native%20&message=v0.68.2&color=085182&style=for-the-badge&logo=react"/>
  <img src="https://img.shields.io/static/v1?label=Platform&message=Expo&color=15171A&style=for-the-badge&logo=expo"/>
</div>
<h1 align="center">Delta Global app challenge</h1>


## 📒 Sobre

"Delta Alumns" é uma aplicação mobile desenvolvida em React Native fazendo uso da plataforma Expo, com um template Bare Workflow. O próposito do app é cumprir os requisitos demandados pelo teste técnico para desenvolvedor mobile na Delta Global.

Alem dá própria biblioteca do React Native, para atender as features solicitadas, foram utilizados os pacotes React Navigation para a transição entre a tela principal e a tela de cadastro, bem como o Image Picker do RN para acesso à galeria do aparelho.

O <a target="_blank" href="https://github.com/JhoneCode/deltacrud-backend">backend</a> da aplicação foi elaborado do zero com uma única rota chamada alumns" onde uma API construida em node é consumida por uma interface Axios, alimentando o cliente da aplicação. As imagens enviadas para o backend são salvas pelo código no Amazon AWS S3 e a uri para o conteúdo, assim como os dados de nome e endereço do aluno são salvos num documento JSON em uma base MONGO DB.

## 📖 Instruções

Para rodar esta aplicação em ambiente de desenvolvimento e/ou fazer alterações no código:

- Clone o repositório para uma pasta local
- Rode um `npm install` ou `yarn install`
- Abra o emulador android de sua preferência
- Execute `npm run android` e espere que o build seja concluído ou com o `Expo` já instalado execute `expo start`

Para testar esta aplicação em ambiente de produção:

- Acesse o link do google drive a seguir para fazer o download do APK: https://drive.google.com/file/d/1PkPhq7rZNEgY6cqvvtNHiVq88oVVEQLZ/view?usp=sharing
- Após o download do Apk, arraste o arquivo para dentro do aparelho emulado, ou instale manualmente no  emulador ou em um aparelho físico

## 🗺 Roadmap
### Status
Projeto finalizado ✅

### Features 🐱‍💻
- [x] Tela de Menu
- [x] Interface de busca e ordenação
- [x] Tela de cadastro de alunos
- [x] Opção para upload de imagem nos formatos PNG e JPG
- [x] Opção de atualização do registro
- [x] Opção de exclusão do registro

## 🛠 Tecnologias
- React Native (lib)
- Node.js (backend)
- Aws S3 (image storage)
- Mongo DB (database)
- Railway (deploy e manutenção)

## 📽 Resultados

⠀⠀⠀![image](https://user-images.githubusercontent.com/86243538/182958421-ed061e65-7d86-4b43-abfc-202e2d32820f.png)⠀⠀⠀
![image](https://user-images.githubusercontent.com/86243538/182958464-700d98df-9c08-4f29-a1d7-f8a1c0d907e8.png)
</br></br></br>
⠀⠀⠀![image](https://user-images.githubusercontent.com/86243538/183129600-16a9c0f1-b9ad-4332-b866-42136f652861.png)⠀⠀⠀
![image](https://user-images.githubusercontent.com/86243538/183129620-8ca13c64-3f34-4c4a-b7a2-eb9ffa95d662.png)
</br></br></br>
⠀⠀⠀![image](https://user-images.githubusercontent.com/86243538/183129631-16f58496-dcee-4ecc-98ce-a0918d7cdef7.png)⠀⠀⠀
![image](https://user-images.githubusercontent.com/86243538/183129633-b8057a8e-9152-4677-9c7a-ac6ee004df31.png)






## 👨‍💻 Autor

João Pedro de Castro Viera (JhoneCode) é um desenvolvedor full stack JavaScript com conhecimentos em diversas tecnologias de desenvolvimento de interfaces modernas e responsivas para ambientes web e mobile.

Contatos:

Email: joaopedro.castrovieira@gmail.com
linkedin: https://www.linkedin.com/in/joao-pedro-de-castro-vieira/
whatsapp: (31) 98981-0745








	  




