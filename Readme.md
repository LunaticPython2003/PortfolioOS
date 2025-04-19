# Portfolio OS - Vintage CRT Terminal Portfolio
A retro-inspired portfolio website that simulates a classic CRT monitor and terminal interface. This project creates an interactive and nostalgic experience where visitors can use terminal commands to explore your professional portfolio.

### [Link to My Portfolio](https://madhurjya.me/PortfolioOS)


## Features

✨ Authentic vintage CRT monitor aesthetics with scan lines, screen glare, and flicker effects 

🖥️ Boot-up sequence simulating GRUB bootloader

🔍 Neofetch system information display

⌨️ Interactive terminal with various commands to explore portfolio content

📁 File system navigation to view projects, skills, experience, and education

📱 Responsive design that works on mobile and desktop devices

## Installation
1. Clone the repository:

```sh
git clone https://github.com/yourusername/vintage-crt-showcase.git
cd vintage-crt-showcase
```

2. Install dependencies:

```sh
npm install
```

3. Edit the portfolio data:

- Update portfolio.json with your personal information
- Update neofetch.json with your preferred system specs
- Customize the ASCII art in neofetch.json if desired
4. Start the development server:
```sh
npm run dev
```
5. Build for production:
```sh
npm run build
```

## Usage

When you first open the portfolio, you'll see a vintage CRT monitor with a boot sequence. After the GRUB-style bootloader completes, the terminal will initialize with a neofetch display followed by a welcome message.

You can interact with the terminal by typing various commands to explore the portfolio content.

Available Commands
- `help` - Show all available commands
- `clear` - Clear the terminal
- `neofetch` - Show system specifications
- `whoami` - Display personal information
- `ls` - List directory contents
- `ls projects` - List all projects
- `ls skills` - List skill categories
- `cat [filename]` - View file contents
- `social` - Show social media links
- `projects` - View all projects
- `skills` - View all skills
- `experience` - View work experience
- `education` - View education
- `contact` - Show contact information
- `date` - Display current date and time
- `reboot` - Reload the application



Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Acknowledgments
Inspired by[ CRT Amber GRUB Theme](https://github.com/Jacksaur/CRT-Amber-GRUB-Theme)
