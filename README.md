## Aplikacja CMDB

### Autorzy: Dawid Skrzypacz, Witold Mikołajczak

#### [Dokumentacja Techniczna: System CMDB](#dokumentacja-techniczna-system-cmdb)

1. [Wprowadzenie](#wprowadzenie)
2. [Opis Systemu CMDB](#opis-systemu-cmdb)
3. [Funkcjonalności Systemu](#funkcjonalności-systemu)
4. [Architektura Systemu](#architektura-systemu)
5. [Technologie Wykorzystane](#technologie-wykorzystane)
6. [Instrukcje Uruchomienia Projektu ASP.NET](#instrukcje-uruchomienia-projektu-aspnet)

---

### Wprowadzenie

System Configuration Management Database (CMDB) stanowi kluczowy element infrastruktury informatycznej, umożliwiając organizacjom zarządzanie i kontrolę nad składnikami oraz konfiguracją swoich zasobów IT. Niniejsza dokumentacja techniczna ma na celu przedstawienie struktury, funkcjonalności oraz technologii wykorzystanych w projekcie implementacji systemu CMDB opartego na platformie ASP.NET i bazie danych SQL Server.

### Opis Systemu CMDB

CMDB jest centralnym repozytorium danych, które przechowuje informacje dotyczące wszystkich zasobów IT w organizacji, takich jak sprzęt komputerowy, oprogramowanie, sieci, usługi oraz ich wzajemne zależności i relacje. System pozwala na zarządzanie pracownikami w firmie oraz przypisywanie do nich dostępnych zasobów, a także umożliwia gromadzenie, zarządzanie i wizualizację danych konfiguracyjnych, co pozwala administratorom na skuteczne monitorowanie i kontrolę infrastruktury IT.

### Funkcjonalności Systemu

- Zarządzanie Zasobami: CMDB umożliwia rejestrowanie, aktualizowanie i usuwanie zasobów IT, takich jak serwery, komputery, urządzenia sieciowe, oprogramowanie, usługi i aplikacje.
- Relacje Między Zasobami: System pozwala definiować i śledzić relacje między różnymi zasobami, co umożliwia kompleksowe zrozumienie infrastruktury IT i identyfikację zależności.
- Wizualizacja Konfiguracji: CMDB oferuje narzędzia do wizualizacji konfiguracji, w tym graficzne prezentacje zasobów i ich relacji, ułatwiając zrozumienie struktury systemu.
- Śledzenie Historii Konfiguracji: System przechowuje historię zmian konfiguracji, co umożliwia śledzenie ewolucji infrastruktury IT oraz przywracanie poprzednich stanów.

### Architektura Systemu

System CMDB oparty jest na architekturze klient-serwer, gdzie warstwa prezentacji jest realizowana za pomocą technologii ASP.NET, a warstwa danych przechowywana jest w bazie danych SQL Server. Komunikacja między warstwami odbywa się poprzez interfejsy programistyczne API.

### Technologie Wykorzystane

- ASP.NET: Platforma do budowy aplikacji internetowych, wykorzystywana do implementacji warstwy prezentacji systemu CMDB.
- SQL Server: System zarządzania relacyjnymi bazami danych, służący do przechowywania danych konfiguracyjnych w CMDB.
- C#: Język programowania używany w środowisku .NET Framework do tworzenia logiki biznesowej i interfejsów aplikacji.
- HTML/CSS: Technologie webowe wykorzystywane do tworzenia interfejsu użytkownika w warstwie prezentacji.
- JavaScript: Język programowania stosowany do implementacji dynamicznych funkcjonalności interfejsu użytkownika.
- REST API: Interfejs programistyczny umożliwiający komunikację między warstwą prezentacji a warstwą danych.

### Instrukcje Uruchomienia Projektu ASP.NET

1. **Pobierz kod źródłowy**: Sklonuj repozytorium projektu z [GitHub](https://github.com/dawidskrzypacz/CMDB).
2. **Otwórz projekt w Visual Studio Code**: Uruchom Visual Studio Code i otwórz folder zawierający projekt CMDB.
3. **Przywróć zależności:** Przed pierwszym uruchomieniem projektu wykonaj polecenie dotnet restore w terminalu Visual Studio Code, aby zainstalować wszystkie niezbędne zależności pakietów NuGet.
```sh
dotnet restore
```
4. **Zbuduj projekt:** Następnie wykonaj polecenie dotnet build, aby zbudować projekt i sprawdzić, czy nie ma błędów kompilacji.
```sh
dotnet build
```
5. **Uruchom aplikację:** Aby uruchomić aplikację, użyj polecenia dotnet run.
```sh
dotnet run
```

Aplikacja zostanie uruchomiona lokalnie i będzie dostępna pod adresem http://localhost:5271 w przeglądarce internetowej.

