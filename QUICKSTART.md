# ☥ Quick Start Guide

## Getting Started with the Feather-Scale Deployment Ritual

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/alengluhic20-oss/F1-.git
cd F1-

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### First Ritual

1. **Click "🌟 Begin Ritual"** - Opens the invocation modal
2. **Read the Invocation** - Ancient Ma'at blessing
3. **Click "Continue"** - Starts the deployment
4. **Watch the Magic** ✨
   - Left side: Cosmic feather-scale visualization
   - Right side: Traditional console logs
   - Stars appear as principles validate
   - Scale balances as system stabilizes

### Understanding the Display

#### Cosmic View (Left Panel)
- **Golden Spiral**: Background sacred geometry
- **Feather-Scale Beam**: Tilts based on balance (-1 to +1)
- **Left Pan (🪶)**: Ma'at's feather (constant truth)
- **Right Pan (❤️)**: Your system's heart (variable health)
- **42 Stars**: Circle represents validated principles
- **Particles**: Recent service deployments
- **Central Ankh (☥)**: Symbol of eternal life

#### Traditional Logs (Right Panel)
- **Timestamp**: When service deployed
- **Status**: Color-coded (green=validated, blue=online, red=error)
- **Service Name**: Which microservice
- **Ma'at #**: Which principle validated
- **Health %**: System health score

### View Modes

Toggle between:
- **Cosmos**: Full cosmic visualization
- **Traditional**: Console logs only
- **Split**: Both views side-by-side (default)

### Sacred Milestones

Every 7 principles (sacred number), the ritual pauses:
- Reflection prompt appears
- Read the milestone message
- Click "Continue" when ready

After 42 principles are validated:
- Completion ceremony
- Hotep blessing (☥)
- Perfect balance achieved

### Controls

- **🌟 Begin Ritual**: Start deployment (only in preparation phase)
- **⏸️ Pause**: Stop metrics stream
- **🔄 Reset**: Return to beginning
- **Phase Indicator**: Shows current ritual phase
- **Validation Counter**: Shows X/42 progress

### The Five Phases

1. **Preparation**: Ready to begin
2. **Invocation**: Opening blessing
3. **Deployment**: Active service deployment
4. **Validation**: Principles being validated
5. **Completion**: All 42 principles achieved

### Tips

- **Let it run**: Each service validates automatically
- **Read the recitations**: They're meaningful
- **Watch the balance**: See harmony emerge
- **Celebrate milestones**: Every 7th principle
- **Split view recommended**: Best experience

### Building for Production

```bash
npm run build
npm run preview
```

Output in `dist/` directory (161KB bundle)

### Troubleshooting

**Nothing happening after Begin?**
- Check browser console for errors
- Refresh page and try again

**Visualization not smooth?**
- Close other browser tabs
- Canvas 2D requires reasonable GPU

**Want faster/slower?**
- Edit `deploymentMetrics.ts`
- Change interval from 2000ms

---

☥ *"May your deployments be balanced, your code be true, and your systems serve with integrity."* ☥
