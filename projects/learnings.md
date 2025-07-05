## Key takeaways from my projects

### darkmailr — Generate realistic, context-aware phishing emails – air-gapped

#### Skills Demonstrated

* Local LLM deployment and configuration using Ollama on Ubuntu server
* Full-stack web application development with Flask framework and HTML templating
* API integration between Flask application and Ollama's OpenAI-compatible endpoints
* Server hardening and network configuration including firewall rules (UFW)
* Cross-platform development workflow between headless Ubuntu server and client systems

#### Lesson Learned

* Open-source LLMs can effectively generate realistic phishing content for security training without relying on cloud services
* Self-hosted solutions provide better control and privacy for sensitive security testing scenarios
* Proper network isolation is crucial when developing tools that could be misused if exposed to the internet
* Local API architectures enable powerful AI capabilities while maintaining air-gapped security environments

### How I Flooded Myself — hping3 Against Apache

#### Skills Demonstrated
* Lab environment setup with VirtualBox, Docker, and multiple OS distributions
* Network traffic capture and analysis with TShark/Wireshark
* Implementation of three DoS attack vectors (SYN, ICMP, UDP floods)
* Network performance measurement and benchmarking
* Secure testing methodology in controlled environments

#### Lesson Learned
* Network infrastructure often fails before well-configured servers
* Modern web servers have built-in resilience against basic DoS attacks
* IP spoofing significantly amplifies attack effectiveness
* Connectionless protocols (UDP) can cause more damage than TCP attacks
* Security testing requires proper traffic and resource monitoring

### From Panic to Action — How to Recover from a GCP Data Breach

#### Skills Demonstrated
* Cloud security incident response and remediation
* Use of Google Cloud Security Command Center
* Firewall and VM configuration
* Cloud Storage access control
* Compliance verification (PCI DSS)

#### Lesson Learned
* Identifying and mitigating common cloud misconfigurations
* Importance of secure firewall rules and VM settings
* Ensuring proper access controls on storage buckets
* Documenting incidents for compliance and future prevention

### Finding Flaws 101 — Scanning Metasploitable2 with Nessus Pro

#### Skills Demonstrated
* Setting up virtual environments for vulnerability assessment
* Deploying Nessus Professional via Docker
* Conducting vulnerability scans on Metasploitable2
* Configuring network settings for realistic testing​

#### Lesson Learned
* Overcoming installation and configuration challenges
* Understanding the importance of network configurations in vulnerability assessments
* Gaining insights into common vulnerabilities in intentionally insecure systems
