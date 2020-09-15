## Welcome to GitHub Pages

### Markdown
### Git基础操作
```
远程仓库
1、绑定github中的使用名和邮箱：        git config --global user.name "dat-lzt"                            git config --global user.email "...@qq.com"

2、从远程下拉远程仓库到本地：git clone 

3、将本地文件上载至暂存区：git add

4、将存在暂存区的文件提交至本地仓库：git commit -m “add message”(全部提交)

5、远程提交：git push

6、本地远程更新：git pull

7、只删除远程仓库，不删除本地仓库：
   git pull # 将远程仓库里面的项目拉下来
   
   git rm -r --cached target # 删除你要删除的文件名称，这里是删除target文件加(本地文件并不会被删除)
   
   git commit -m "删除了target"
   
   git push
   
```
```
本地仓库:
1、初始化创建本地仓库： git init

2、查看仓库状态； git status

3、添加到本地暂存区： git add

4、将文件从暂存区添加到本地仓库：git commit -m "备注"

5、删除仓库中的文件：git rm -- **

6、撤销之前的所有 git add 操作，即在暂存区的修改: git reset


```
