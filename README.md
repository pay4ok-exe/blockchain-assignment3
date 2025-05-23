# Задание 1: Профиль и Голосование

## Описание
В этом задании реализованы два смарт-контракта на Solidity:
1. `Profile` - контракт для управления пользовательскими профилями
2. `Voting` - контракт для проведения голосования с несколькими кандидатами

### Контракт Profile
Контракт Profile позволяет пользователям:
- Создавать свой профиль с именем пользователя, именем, фамилией и электронной почтой
- Получать данные своего профиля
- Удалять свой профиль

### Контракт Voting
Контракт Voting реализует систему голосования с функциями:
- Просмотр списка кандидатов
- Голосование за выбранного кандидата
- Изменение своего голоса
- Отзыв своего голоса
- Получение информации о своем голосе
- Просмотр общих результатов голосования

## Инструкция по запуску
1. Установить зависимости:
```
npm install
```

2. Запустить локальный блокчейн Ganache:
```
ganache-cli -p 8545
```

3. Скомпилировать контракты:
```
npx truffle compile
```

4. Развернуть контракты:
```
npx truffle migrate
```

5. Запустить тесты:
```
npx truffle test
```

6. Взаимодействовать с контрактами можно через консоль Truffle:
```
npx truffle console
```

В консоли:
```javascript
// Получить экземпляры контрактов
let profile = await Profile.deployed()
let voting = await Voting.deployed()

// Работа с профилем
await profile.setProfile("username1", "John", "Doe", "john@example.com")
let myProfile = await profile.getProfile()
console.log(myProfile)

// Работа с голосованием
let summary = await voting.summary()
console.log(summary)
await voting.vote(0) // Голосовать за первого кандидата
let myVote = await voting.getVote()
console.log(myVote)
```

## Технические детали
- **Solidity 0.8.19** - язык программирования для смарт-контрактов
- **Truffle** - фреймворк для разработки, тестирования и деплоя
- **Ganache** - локальный блокчейн для тестирования