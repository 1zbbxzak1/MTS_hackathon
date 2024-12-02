## Хакатон Hack&Change 2024

Трек Web/DA: Сервис визуализации организационной структуры от МТС Линк

Команда: **эко-ручка**

[Ссылка на Backend](https://github.com/kayakto/MTS-Hahaton.git)

## Установка и запуск
1. Склонируйте репозиторий backend
```bash
git clone git@github.com:kayakto/MTS-Hahaton.git
```

2. Перейдите к проекту
```bash
cd MTS-Hahaton
```

3. Обновить проект с frontend
```bash
git submodule update --init --recursive
```

### Запуск через Docker

1. Создайте **.env** файл со следующей структурой:
```
DEBUG=True
SECRET_KEY='django-insecure--%++b_n=^($_jic0t&5v+fp+8e0z7c$'

DATABASE_NAME=django_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres_password
DATABASE_HOST=postgres
DATABASE_PORT=5432
```

2. Выполните запуск контейнеров docker-compose:
```bash
docker-compose up -d 
```

3. 
- Backend доступен на порте [localhost:8000](http://localhost:8000/)
- Frontend доступен на порте [localhost:4000](http://localhost:4000/)

ВАЖНО: если запросы к backend не проходят, попробуйте перезагрузить контейнер mts-backend

### Альтернативный вариант запуска frontend и backend

1. Перейдите к backend
```bash
cd backend
```

2. Создайте venv
```bash
python -m venv venv
```
```bash
source venv/Scripts/activate
``` 

3. Установите зависимости
```bash
pip install -r requirements.txt
```

4. Запустите сервер
```bash
python mts_hahaton/manage.py runserver
```

5. Склонируйте репозиторий frontend:
```bash
git clone https://github.com/1zbbxzak1/MTS_hackathon.git
```

6. Перейдите к проекту
```bash
cd MTS-Hackathon
```

7. Установите Angular: 
```bash
npm install -g @angular/cli
```

8. Установите все необходимые пакеты:
```bash
npm install
```

9. После этого, запустите проект: 
```bash
npm start
```

10. Перейдите по ссылке:
```bash
http://localhost:4200
```

11. Чтобы остановить frontend, нажмите это в терминале:
```bash
Ctrl + C
```
