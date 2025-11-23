import React from "react";

export default function ArealPage() {
	return (
		<main style={{backgroundColor: '#0b0e11', color: '#e6edf3', fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif', minHeight: '100vh'}}>
			<header style={{padding: '20px 0', position: 'sticky', top: 0, background: 'rgba(11, 14, 17, 0.9)', backdropFilter: 'blur(10px)', zIndex: 100, borderBottom: '1px solid #30363d'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<a href="#" style={{fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px', color: '#fff', textDecoration: 'none'}}>AReaL</a>
					<nav style={{display: 'flex', gap: 24}}>
						<a href="#features" style={{color: '#8b949e', fontSize: '0.9rem', fontWeight: 500}}>Features</a>
						<a href="#algorithms" style={{color: '#8b949e', fontSize: '0.9rem', fontWeight: 500}}>Algorithms</a>
						<a href="#models" style={{color: '#8b949e', fontSize: '0.9rem', fontWeight: 500}}>Models</a>
						<a href="https://inclusionai.github.io/AReaL/intro.html" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem', fontWeight: 500}}>Docs</a>
						<a href="https://github.com/inclusionAI/AReaL" target="_blank" style={{background: '#fff', color: '#000', padding: '8px 16px', borderRadius: 6, fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none'}}>View on GitHub</a>
					</nav>
				</div>
			</header>

			<section style={{textAlign: 'center', padding: '120px 0 100px', background: 'radial-gradient(circle at 50% 0%, #1c2333 0%, #0b0e11 70%)'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px'}}>
					<h1 style={{fontSize: '3.5rem', lineHeight: 1.1, marginBottom: 24, fontWeight: 700, letterSpacing: '-0.5px'}}>
						Build <span style={{background: 'linear-gradient(90deg, #79c0ff, #d2a8ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Agentic Models</span><br />Faster & Simpler
					</h1>
					<p style={{maxWidth: 700, margin: '0 auto 40px', fontSize: '1.25rem', color: '#8b949e'}}>
						AReaL is an open-source <strong>fully asynchronous</strong> reinforcement learning training system developed by the Ant Group. Build your own AI agents easily and affordably.
					</p>
					<div style={{display: 'flex', gap: 16, justifyContent: 'center'}}>
						<a href="https://github.com/inclusionAI/AReaL?tab=readme-ov-file#-getting-started" style={{display: 'inline-block', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: '1rem', background: '#2f81f7', color: '#fff', textDecoration: 'none'}}>Get Started</a>
						<a href="https://github.com/inclusionAI/ASearcher" style={{display: 'inline-block', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: '1rem', background: '#15191e', border: '1px solid #30363d', color: '#e6edf3', textDecoration: 'none'}}>ASearcher Demo</a>
					</div>
				</div>
			</section>

			<section id="features" style={{padding: '80px 0', borderBottom: '1px solid #30363d'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px'}}>
					<h2 style={{fontSize: '2rem', marginBottom: 40, textAlign: 'center', fontWeight: 700, color: '#fff'}}>Why AReaL?</h2>
					<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24}}>
															<div style={{background: '#15191e', border: '1px solid #30363d', padding: 32, borderRadius: 12}}>
																<span style={{display: 'block', marginBottom: 16}}>
																	{/* Flexibility Icon - Settings/Sliders SVG */}
																	<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#79c0ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><circle cx="4" cy="12" r="2" fill="#79c0ff"/><circle cx="12" cy="10" r="2" fill="#79c0ff"/><circle cx="20" cy="14" r="2" fill="#79c0ff"/></svg>
																</span>
																<h3 style={{fontSize: '1.25rem', marginBottom: 12, fontWeight: 700, color: '#fff'}}>Flexibility</h3>
																<p style={{color: '#8b949e', fontSize: '1rem'}}>Seamless customization for <a href="https://inclusionai.github.io/AReaL/customization/agent.html" target="_blank" style={{color: '#2f81f7'}}>multi-turn agentic rollout</a> workflows within a single file. Smooth integration with other agentic tooling frameworks.</p>
															</div>
															<div style={{background: '#15191e', border: '1px solid #30363d', padding: 32, borderRadius: 12}}>
																<span style={{display: 'block', marginBottom: 16}}>
																	{/* Scalability Icon - Network/Nodes SVG */}
																	<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2f81f7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" fill="#2f81f7"/><circle cx="19" cy="12" r="2" fill="#2f81f7"/><circle cx="5" cy="12" r="2" fill="#2f81f7"/><line x1="7" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="17" y2="12"/></svg>
																</span>
																<h3 style={{fontSize: '1.25rem', marginBottom: 12, fontWeight: 700, color: '#fff'}}>Scalability</h3>
																<p style={{color: '#8b949e', fontSize: '1rem'}}>Through algorithm-system co-design, AReaL delivers <strong>stable</strong> fully asynchronous RL training with <strong>industry-leading speed</strong>. Scales from a single node to 1,000+ GPUs seamlessly.</p>
															</div>
															<div style={{background: '#15191e', border: '1px solid #30363d', padding: 32, borderRadius: 12}}>
																<span style={{display: 'block', marginBottom: 16}}>
																	{/* Cutting-Edge Performance Icon - Trophy + Star SVG */}
																	<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
																		<g>
																			<path d="M8 21h8" stroke="#d2a8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
																			<path d="M12 17v4" stroke="#d2a8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
																			<path d="M7 4h10v6a5 5 0 0 1-10 0V4z" fill="#d2a8ff" stroke="#d2a8ff" strokeWidth="2.2" />
																			<path d="M4 8v1a7 7 0 0 0 7 7" stroke="#d2a8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
																			<path d="M20 8v1a7 7 0 0 1-7 7" stroke="#d2a8ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
																		</g>
																		<g>
																			<polygon points="12,6 13,9 16,9.2 14,11 14.5,14 12,12.5 9.5,14 10,11 8,9.2 11,9" fill="#ffd700" stroke="#ffd700" strokeWidth="0.8" />
																		</g>
																	</svg>
																</span>
																<h3 style={{fontSize: '1.25rem', marginBottom: 12, fontWeight: 700, color: '#fff'}}>Cutting-Edge Performance</h3>
																<p style={{color: '#8b949e', fontSize: '1rem'}}>Produces state-of-the-art <a href="https://github.com/inclusionAI/AReaL/blob/main/blog/AReaL_v0_2.md" target="_blank" style={{color: '#2f81f7'}}>math</a>, <a href="https://github.com/inclusionAI/AReaL/blob/main/blog/AReaL_v0_3.md" target="_blank" style={{color: '#2f81f7'}}>coding</a>, and <a href="https://github.com/inclusionAI/ASearcher" target="_blank" style={{color: '#2f81f7'}}>search agents</a> with exceptional capabilities.</p>
															</div>
					</div>
				</div>
			</section>

			<section id="algorithms" style={{padding: '80px 0', borderBottom: '1px solid #30363d'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px'}}>
					<div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40}}>
						<div>
							<h3 style={{fontSize: '1.25rem', marginBottom: 12, fontWeight: 700, color: '#fff'}}>Supported Algorithms</h3>
							<p style={{color: '#8b949e', fontSize: '1rem'}}>Comprehensive support for modern RL techniques.</p>
							<div style={{overflowX: 'auto'}}>
								<table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem'}}>
									<thead>
										<tr>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Algorithm</th>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Docs</th>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Config</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>GRPO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/docs/algorithms/grpo.md" style={{color: '#2f81f7'}}>📖 Docs</a></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/math/gsm8k_grpo.yaml" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>PPO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>-</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/math/gsm8k_ppo.yaml" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>DAPO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/docs/algorithms/dapo.md" style={{color: '#2f81f7'}}>📖 Docs</a></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/experimental/dapo/gsm8k_dapo.py" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>LitePPO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/docs/algorithms/litePPO.md" style={{color: '#2f81f7'}}>📖 Docs</a></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>-</td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>Dr.GRPO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/docs/algorithms/dr.GRPO.md" style={{color: '#2f81f7'}}>📖 Docs</a></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>-</td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>REINFORCE++</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>-</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/math/gsm8k_reinforce.yaml" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>RLOO</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/docs/algorithms/rloo.md" style={{color: '#2f81f7'}}>📖 Docs</a></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/math/gsm8k_rloo.yaml" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}><strong>SFT</strong></td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>-</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}><a href="https://github.com/inclusionAI/AReaL/blob/main/examples/math/gsm8k_sft.py" style={{color: '#2f81f7'}}>🔗 Example</a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div id="models">
							<h3 style={{fontSize: '1.25rem', marginBottom: 12, fontWeight: 700, color: '#fff'}}>Supported Models</h3>
							<p style={{color: '#8b949e', fontSize: '1rem'}}>Optimized for the latest open weights.</p>
							<div style={{overflowX: 'auto'}}>
								<table style={{width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem'}}>
									<thead>
										<tr>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Model Family</th>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Megatron</th>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>FSDP</th>
											<th style={{color: '#8b949e', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #30363d'}}>Notes</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Qwen2/3</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Qwen3-MoE</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}></td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Qwen2.5-VL</td>
											<td style={{color: '#da3633', opacity: 0.7, padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✖</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Vision-language</td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Gemma 3</td>
											<td style={{color: '#da3633', opacity: 0.7, padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✖</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Vision-language</td>
										</tr>
										<tr>
											<td style={{fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Other HF LLM</td>
											<td style={{color: '#da3633', opacity: 0.7, padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✖</td>
											<td style={{color: '#238636', padding: '12px 16px', borderBottom: '1px solid #30363d'}}>✔</td>
											<td style={{padding: '12px 16px', borderBottom: '1px solid #30363d'}}>Requires <code>transformers</code></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section style={{padding: '80px 0', borderBottom: '1px solid #30363d'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px'}}>
					<div style={{background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', border: '1px solid #30363d', borderRadius: 16, padding: 60, textAlign: 'center', position: 'relative', overflow: 'hidden'}}>
						<div style={{position: 'relative', zIndex: 1}}>
							<h2 style={{fontSize: '2rem', marginBottom: 40, textAlign: 'center', fontWeight: 700, color: '#fff'}}>Experience <span style={{color: '#79c0ff'}}>ASearcher</span></h2>
							<p style={{color: '#8b949e', fontSize: '1.1rem'}}>Explore the intelligence of our cutting-edge search agents powered by AReaL.</p>
							<br />
							<a href="https://github.com/inclusionAI/ASearcher" target="_blank" style={{display: 'inline-block', padding: '12px 32px', borderRadius: 6, fontWeight: 600, fontSize: '1rem', background: '#2f81f7', color: '#fff', textDecoration: 'none'}}>View Demo & Paper</a>
						</div>
					</div>
				</div>
			</section>

			<footer style={{padding: '60px 0', borderTop: '1px solid #30363d', marginTop: 0, background: '#090c10'}}>
				<div style={{maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40}}>
					<div>
						<a href="#" style={{fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px', color: '#fff', textDecoration: 'none'}}>AReaL</a>
						<p style={{fontSize: '0.9rem', marginTop: 16, maxWidth: 300, color: '#8b949e'}}>Open-source reinforcement learning training system for large reasoning and agentic models.</p>
						<p style={{fontSize: '0.8rem', color: '#555'}}>&copy; 2025 Ant Group. All rights reserved.</p>
					</div>
					<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24}}>
						<div>
							<h4 style={{color: '#fff', marginBottom: 16, fontSize: '0.9rem', fontWeight: 600}}>Repositories</h4>
							<ul style={{listStyle: 'none', padding: 0}}>
								<li style={{marginBottom: 8}}><a href="https://github.com/inclusionAI/AReaL" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>GitHub: AReaL</a></li>
								<li style={{marginBottom: 8}}><a href="https://github.com/inclusionAI/ASearcher" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>GitHub: ASearcher</a></li>
							</ul>
						</div>
						<div>
							<h4 style={{color: '#fff', marginBottom: 16, fontSize: '0.9rem', fontWeight: 600}}>Documentation</h4>
							<ul style={{listStyle: 'none', padding: 0}}>
								<li style={{marginBottom: 8}}><a href="https://github.com/inclusionAI/AReaL?tab=readme-ov-file#-getting-started" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>Getting Started</a></li>
								<li style={{marginBottom: 8}}><a href="https://inclusionai.github.io/AReaL/intro.html" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>Full Docs</a></li>
								<li style={{marginBottom: 8}}><a href="https://inclusionai.github.io/AReaL/customization/agent.html" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>Agent Guide</a></li>
							</ul>
						</div>
						<div>
							<h4 style={{color: '#fff', marginBottom: 16, fontSize: '0.9rem', fontWeight: 600}}>Research</h4>
							<ul style={{listStyle: 'none', padding: 0}}>
								<li style={{marginBottom: 8}}><a href="https://arxiv.org/pdf/2505.24298" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>Paper: AReaL</a></li>
								<li style={{marginBottom: 8}}><a href="https://arxiv.org/abs/2508.07976" target="_blank" style={{color: '#8b949e', fontSize: '0.9rem'}}>Paper: ASearcher</a></li>
							</ul>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}
