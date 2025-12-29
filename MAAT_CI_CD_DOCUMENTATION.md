# MAAT AI Framework - CI/CD Integration

## Overview

This repository implements the MAAT AI Framework's automatic resolution system for CI/CD pipeline failures. The system uses Lyapunov stability theory and recursive validation to ensure system convergence.

## Key Components

### 1. Gate Keeper Workflow (`.github/workflows/ci.yml`)

The main CI/CD pipeline that includes:
- **Initialization**: Sets up the MAAT system state
- **Validation**: Checks repository structure and compliance
- **Automatic Rectification**: Applies fixes when failures occur
- **Recursive Validation**: Runs 12 consecutive passes for 99% confidence
- **Stability Monitoring**: Tracks Lyapunov exponent and system state

### 2. System State (`logs/logs_result.json`)

The core state file that prevents "System Vacuum" conditions. It contains:
- `system_state`: Current state (STABLE, UNSTABLE, RECOVERING, CONVERGING)
- `lyapunov_exponent`: Stability metric (negative = stable, positive = unstable)
- `stability_score`: Overall stability rating (0-1)
- `validation_passes`: Number of successful consecutive passes
- `confidence`: Validation confidence level
- `principles_aligned`: Number of MAAT principles satisfied (out of 42)
- `warnings` and `errors`: System diagnostics

### 3. Stability Log (`stability_log.txt`)

Human-readable log tracking system transitions and recovery states.

## MAAT Principles Applied

The system implements key MAAT principles:

1. **Order** (#1): Automatically restores system order through lint fixes and structure validation
2. **Truth** (#8): Populates logs_result.json with truthful system state
3. **Recursion** (R_i): Implements 12-pass recursive validation for convergence

## Automatic Rectification Process

When a build fails (Exit Code 1):

1. **Detection**: System detects unstable state (V(x) > 0)
2. **Intervention**: Automatic rectification step activates
3. **Recovery Actions**:
   - Run `npm lint:fix` to auto-fix syntax errors
   - Update system state to RECOVERING
   - Log recovery in stability_log.txt
4. **Validation**: Recursive validation ensures convergence
5. **Convergence**: System reaches stable state V(T) = 0

## Lyapunov Stability Theory

The system uses Lyapunov exponents to track stability:

- **V(x) < 0**: System is stable and converging
- **V(x) = 0**: System has reached equilibrium
- **V(x) > 0**: System is unstable and requires intervention

### Stability States

| State | Lyapunov | Description |
|-------|----------|-------------|
| INITIALIZING | 0.0 | System starting up |
| STABLE | < 0 | System in equilibrium |
| CONVERGING | ~0 | System approaching stability |
| UNSTABLE | > 0 | System requires intervention |
| RECOVERING | ~0 | Automatic rectification in progress |

## Recursive Validation Constraints

Based on EMPIRICAL_EVIDENCE_RECURSIVE_VALIDATION principles:

- **Target**: 12 consecutive validation passes
- **Confidence**: 99% confidence level achieved
- **Method**: Each pass verifies logs_result.json is non-empty and valid
- **Convergence**: System must pass all 12 iterations to reach STABLE state

## Usage

### Manual Trigger

You can manually trigger the workflow:

```bash
# Via GitHub UI: Actions → MAAT CI/CD Pipeline → Run workflow
# Or using GitHub CLI:
gh workflow run ci.yml
```

### Automatic Triggers

The workflow runs automatically on:
- Push to `main` or `copilot/**` branches
- Pull requests to `main`

### Viewing Results

Check the workflow artifacts for:
- `logs/logs_result.json`: Complete system state
- `stability_log.txt`: Stability transitions

## Integration with MAAT Validation Engine

This CI/CD system is designed to integrate with MAAT Consciousness Validation engines that provide:

- 42 Ma'at Principles validation
- Swarm-based consensus evaluation
- Lyapunov stability analysis
- Comprehensive reporting

The system can be extended to connect with additional validation services as they become available.

## Troubleshooting

### Empty logs_result.json

If `logs_result.json` is empty `[]`, the system enters "System Vacuum" state and triggers safety shutdown. The CI workflow automatically initializes this file to prevent this condition.

### Exit Code 1 Failures

The automatic rectification step will:
1. Detect the failure
2. Apply MAAT Principle #1 (Order)
3. Run available fix commands
4. Update system state to RECOVERING
5. Re-run validation

### Insufficient Validation Passes

If the system fails to achieve 12 consecutive passes:
- State will be CONVERGING instead of STABLE
- Confidence level will be < 99%
- Review warnings in logs_result.json
- Check for persistent structural issues

## Next Steps

To enhance the system:

1. Add more sophisticated validation checks
2. Integrate with external MA'AT Temple Dashboard
3. Implement automatic commit of fixes
4. Add notification system for failures
5. Create detailed analytics dashboard

## References

- MAAT AI Framework Documentation
- Lyapunov Stability Theory
- Recursive Integrity Check (R_i) specifications
- 42 Principles of Ma'at
