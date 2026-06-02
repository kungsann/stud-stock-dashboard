"use client";

import { useMemo, useState } from "react";

const studSizes = [
  { size: 10, group: "แท่นเล็ก", stock: 260, reorder: 80, produced: 180, pendingProduction: 70, poOrdered: 300, shipped: 145, pendingShipment: 105 },
  { size: 13, group: "แท่นเล็ก", stock: 145, reorder: 70, produced: 120, pendingProduction: 65, poOrdered: 220, shipped: 80, pendingShipment: 105 },
  { size: 15, group: "แท่นเล็ก", stock: 92, reorder: 90, produced: 72, pendingProduction: 88, poOrdered: 200, shipped: 45, pendingShipment: 115 },
  { size: 17, group: "แท่นกลาง", stock: 58, reorder: 75, produced: 95, pendingProduction: 55, poOrdered: 180, shipped: 64, pendingShipment: 86 },
  { size: 18, group: "แท่นกลาง", stock: 120, reorder: 70, produced: 130, pendingProduction: 40, poOrdered: 180, shipped: 95, pendingShipment: 75 },
  { size: 20, group: "แท่นกลาง", stock: 0, reorder: 65, produced: 42, pendingProduction: 130, poOrdered: 250, shipped: 20, pendingShipment: 152 },
  { size: 23, group: "แท่นใหญ่", stock: 88, reorder: 60, produced: 60, pendingProduction: 70, poOrdered: 150, shipped: 38, pendingShipment: 92 },
  { size: 25, group: "แท่นใหญ่", stock: 34, reorder: 55, produced: 54, pendingProduction: 96, poOrdered: 160, shipped: 35, pendingShipment: 115 },
  { size: 30, group: "แท่นใหญ่", stock: 72, reorder: 50, produced: 40, pendingProduction: 60, poOrdered: 120, shipped: 18, pendingShipment: 82 },
];

const projects = [
  {
    code: "PJ-2406-01",
    customer: "โครงการอาคาร A",
    due: "12-18 มิ.ย.",
    status: "ปิดขายแล้ว",
    sizes: [
      { size: 10, ordered: 160, produced: 120, shipped: 80 },
      { size: 13, ordered: 120, produced: 90, shipped: 60 },
      { size: 17, ordered: 80, produced: 55, shipped: 35 },
      { size: 25, ordered: 60, produced: 30, shipped: 20 },
    ],
  },
  {
    code: "PJ-2406-02",
    customer: "โครงการโรงงาน B",
    due: "20-25 มิ.ย.",
    status: "รอผลิต",
    sizes: [
      { size: 15, ordered: 90, produced: 40, shipped: 0 },
      { size: 18, ordered: 70, produced: 55, shipped: 20 },
      { size: 20, ordered: 90, produced: 18, shipped: 0 },
      { size: 30, ordered: 60, produced: 22, shipped: 0 },
    ],
  },
  {
    code: "PJ-2406-03",
    customer: "โครงการคอนโด C",
    due: "ทยอยส่ง 3 เที่ยว",
    status: "ผลิตบางส่วน",
    sizes: [
      { size: 13, ordered: 70, produced: 30, shipped: 20 },
      { size: 23, ordered: 60, produced: 28, shipped: 18 },
      { size: 25, ordered: 60, produced: 24, shipped: 15 },
    ],
  },
];

const receivingChecks = [
  { po: "PO-IM-884", size: 10, ordered: 300, counted: 286 },
  { po: "PO-IM-884", size: 18, ordered: 180, counted: 192 },
  { po: "PO-IM-891", size: 20, ordered: 250, counted: 0 },
];

function formatNumber(value) {
  return new Intl.NumberFormat("th-TH").format(value);
}

function sum(items, key) {
  return items.reduce((total, item) => total + item[key], 0);
}

function sumProject(project, key) {
  return project.sizes.reduce((total, item) => total + item[key], 0);
}

function statusFor(item) {
  if (item.stock === 0) return { label: "ขาดสต๊อก", className: "danger" };
  if (item.stock <= item.reorder) return { label: "ต่ำกว่าจุดสั่งซื้อ", className: "warning" };
  return { label: "พร้อมใช้", className: "success" };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");

  const metrics = useMemo(
    () => ({
      totalSizes: studSizes.length,
      totalStock: sum(studSizes, "stock"),
      produced: sum(studSizes, "produced"),
      pendingProduction: sum(studSizes, "pendingProduction"),
      pendingShipment: sum(studSizes, "pendingShipment"),
    }),
    []
  );

  const filteredSizes = studSizes.filter((item) => {
    const text = `${item.size} ${item.group} STUD-${item.size}`.toLowerCase();
    const matchesQuery = text.includes(query.toLowerCase());
    const matchesGroup = group === "all" || item.group === group;
    return matchesQuery && matchesGroup;
  });

  const maxStock = Math.max(...studSizes.map((item) => item.stock), 1);
  const groups = Array.from(new Set(studSizes.map((item) => item.group)));

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <div className="profile">
          <span className="avatar">S</span>
          <div>
            <strong>STUD Stock</strong>
            <small>Project Inventory</small>
          </div>
        </div>
        <nav>
          <a className="active" href="#">Dashboard</a>
          <a href="#">Project Closing</a>
          <a href="#">PO Materials</a>
          <a href="#">Production</a>
          <a href="#">Shipping</a>
          <a href="#">Stock Count</a>
        </nav>
        <div className="sidebar-note">
          <span>ค้างส่งรวม</span>
          <strong>{formatNumber(metrics.pendingShipment)} ตัว</strong>
        </div>
      </aside>

      <section className="main-panel">
        <header className="top-strip">
          <p>ระบบจัดการ STUD ตั้งแต่ปิดขายโครงการ ผลิต ตรวจรับ PO จนถึงส่งหลายรอบ</p>
          <div>
            <button className="light-button" type="button">Print</button>
            <button className="primary-action" type="button">เพิ่มโครงการ</button>
          </div>
        </header>

        <section className="welcome-bar">
          <div>
            <p className="eyebrow">STUD operation dashboard</p>
            <h1>ภาพรวมสต๊อก ผลิต และส่งของ</h1>
          </div>
          <div className="filters">
            <label>
              <span>ค้นหาไซร์</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="10, 13, STUD-20" />
            </label>
            <label>
              <span>กลุ่มแท่น</span>
              <select value={group} onChange={(event) => setGroup(event.target.value)}>
                <option value="all">ทั้งหมด</option>
                {groups.map((groupName) => (
                  <option key={groupName} value={groupName}>{groupName}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="section-title">
          <div>
            <h2>ภาพรวมวันนี้</h2>
            <p>ตัวเลขหลักสำหรับตัดสินใจเรื่องผลิต จัดซื้อ และส่งของ</p>
          </div>
        </section>

        <section className="metrics">
          <KpiCard tone="cyan" label="ขนาดแท่นในระบบ" value={metrics.totalSizes} detail="10-30 CM" />
          <KpiCard tone="pink" label="สต๊อกคงเหลือรวม" value={formatNumber(metrics.totalStock)} detail="รวมทุกไซร์" />
          <KpiCard tone="green" label="ผลิตแล้ว" value={formatNumber(metrics.produced)} detail="พร้อมรอส่ง/ประกอบ" />
          <KpiCard tone="yellow" label="ยังไม่ได้ผลิต" value={formatNumber(metrics.pendingProduction)} detail="รอเข้าคิวผลิต" />
          <KpiCard tone="orange" label="ค้างส่งลูกค้า" value={formatNumber(metrics.pendingShipment)} detail="ส่งหลายรอบจนจบโครงการ" />
        </section>

        <section className="process-grid">
          <ProcessCard tone="blue" label="ปิดงานขายโครงการ" value={projects.length} detail="โครงการมีหลายความสูง" />
          <ProcessCard tone="orange" label="PO ต่างประเทศ" value={new Set(receivingChecks.map((item) => item.po)).size} detail="สั่งแท่นตามใบ PO" />
          <ProcessCard tone="pink" label="ตรวจนับก่อนเข้าคลัง" value={receivingChecks.length} detail="ยอดจริงอาจไม่ตรง PO" />
          <ProcessCard tone="purple" label="ไซร์ที่รอผลิต" value={studSizes.filter((item) => item.pendingProduction > 0).length} detail="ต้องประกอบก่อนส่ง" />
          <ProcessCard tone="green" label="ไซร์ที่ค้างส่ง" value={studSizes.filter((item) => item.pendingShipment > 0).length} detail="รอส่งให้ครบโครงการ" />
        </section>

        <section className="dashboard-grid">
          <article className="panel">
            <PanelHeader title="STUD Size Overview" desc="สต๊อกคงเหลือเทียบจุดสั่งซื้อ แยกตามความสูง" />
            <div className="legend">
              <span><i className="blue-dot" /> คงเหลือ</span>
              <span><i className="orange-dot" /> จุดสั่งซื้อ</span>
            </div>
            <div className="bar-chart">
              {studSizes.map((item) => (
                <div className="bar-group" key={item.size}>
                  <span className="bar stock" style={{ height: `${Math.max(4, Math.round((item.stock / maxStock) * 100))}%` }} />
                  <span className="bar reorder" style={{ height: `${Math.max(4, Math.round((item.reorder / maxStock) * 100))}%` }} />
                  <span className="bar-label">{item.size}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="สรุปตามกลุ่มแท่น" desc="จำนวนไซร์ในแต่ละกลุ่ม" />
            <div className="donut" />
            <div className="category-list">
              {groups.map((groupName, index) => (
                <div className="category-item" key={groupName}>
                  <span>{groupName}</span>
                  <b className={`badge-${index}`}>{studSizes.filter((item) => item.group === groupName).length}</b>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="summary-grid">
          <SummaryPanel title="สต๊อก / ผลิต" desc="คงเหลือ ผลิตแล้ว และยังไม่ได้ผลิต">
            {studSizes.map((item) => (
              <SummaryItem key={item.size} title={`${item.size} CM`} value={`${formatNumber(item.pendingShipment)} ค้างส่ง`}>
                คงเหลือ {formatNumber(item.stock)} | ผลิตแล้ว {formatNumber(item.produced)} | ยังไม่ผลิต {formatNumber(item.pendingProduction)}
              </SummaryItem>
            ))}
          </SummaryPanel>
          <SummaryPanel title="งานปิดขาย" desc="โครงการ จำนวนรวม และไซร์ในงาน">
            {projects.map((project) => (
              <SummaryItem key={project.code} title={`${project.code} ${project.customer}`} value={`${formatNumber(sumProject(project, "ordered"))} ตัว`}>
                {project.sizes.map((item) => `${item.size}CM ${item.ordered}`).join(", ")} | กำหนด {project.due}
              </SummaryItem>
            ))}
          </SummaryPanel>
          <SummaryPanel title="PO วัตถุดิบ" desc="จำนวนที่สั่งไปและผลตรวจรับ">
            {receivingChecks.map((check) => {
              const diff = check.counted - check.ordered;
              const label = check.counted === 0 ? "รอนับ" : diff > 0 ? `เกิน ${diff}` : diff < 0 ? `ขาด ${Math.abs(diff)}` : "ตรง PO";
              return (
                <SummaryItem key={`${check.po}-${check.size}`} title={`${check.po} | ${check.size} CM`} value={label}>
                  PO {formatNumber(check.ordered)} | นับจริง {formatNumber(check.counted)}
                </SummaryItem>
              );
            })}
          </SummaryPanel>
          <SummaryPanel title="ออกของ / ค้างส่ง" desc="ออกแล้วและคงเหลือที่ยังไม่ได้ส่ง">
            {studSizes.map((item) => (
              <SummaryItem key={item.size} title={`${item.size} CM`} value={item.pendingShipment > 0 ? "ยังไม่จบ" : "จบแล้ว"}>
                ออกแล้ว {formatNumber(item.shipped)} | ค้างส่ง {formatNumber(item.pendingShipment)}
              </SummaryItem>
            ))}
          </SummaryPanel>
        </section>

        <section className="project-grid">
          <article className="panel">
            <PanelHeader title="Project Sales" desc="งานปิดขายแบบโครงการ หนึ่งโครงการมีหลายขนาด" />
            <div className="project-list">
              {projects.map((project) => (
                <div className="project-item" key={project.code}>
                  <span>
                    <strong>{project.code}</strong>
                    <small>{project.customer} | กำหนด {project.due}</small>
                  </span>
                  <span>
                    <strong>{project.sizes.map((item) => `${item.size}CM ${item.ordered}`).join(", ")}</strong>
                    <small>สั่ง {formatNumber(sumProject(project, "ordered"))} | ผลิต {formatNumber(sumProject(project, "produced"))} | ส่ง {formatNumber(sumProject(project, "shipped"))}</small>
                  </span>
                  <b>{project.status}</b>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <PanelHeader title="PO Receiving Check" desc="ของนำเข้าอาจไม่ตรง PO ต้องนับก่อนเข้าสต๊อก" />
            <div className="receiving-list">
              {receivingChecks.map((check) => {
                const diff = check.counted - check.ordered;
                const className = check.counted === 0 || diff < 0 ? "short" : diff > 0 ? "over" : "match";
                const label = check.counted === 0 ? "รอนับ" : diff > 0 ? `เกิน ${diff}` : diff < 0 ? `ขาด ${Math.abs(diff)}` : "ตรง PO";
                return (
                  <div className="receiving-item" key={`${check.po}-${check.size}`}>
                    <span>
                      <strong>{check.po}</strong>
                      <small>แท่น {check.size} CM</small>
                    </span>
                    <span className="po-count">
                      <small>PO {formatNumber(check.ordered)}</small>
                      <small>นับได้ {formatNumber(check.counted)}</small>
                    </span>
                    <b className={className}>{label}</b>
                  </div>
                );
              })}
            </div>
          </article>
        </section>

        <section className="table-section">
          <div className="table-toolbar">
            <div>
              <h2>STUD Material Stock</h2>
              <p>สต๊อกวัตถุดิบแท่น แยกตามความสูง ผลิต และส่งของ</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ไซร์</th>
                  <th>กลุ่ม</th>
                  <th>คงเหลือ</th>
                  <th>ผลิตแล้ว</th>
                  <th>ยังไม่ผลิต</th>
                  <th>PO สั่งไป</th>
                  <th>ออกแล้ว</th>
                  <th>ค้างส่ง</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {filteredSizes.map((item) => {
                  const status = statusFor(item);
                  return (
                    <tr key={item.size}>
                      <td><strong>STUD {item.size} CM</strong></td>
                      <td>{item.group}</td>
                      <td>{formatNumber(item.stock)}</td>
                      <td>{formatNumber(item.produced)}</td>
                      <td>{formatNumber(item.pendingProduction)}</td>
                      <td>{formatNumber(item.poOrdered)}</td>
                      <td>{formatNumber(item.shipped)}</td>
                      <td>{formatNumber(item.pendingShipment)}</td>
                      <td><span className={`status ${status.className}`}>{status.label}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  );
}

function KpiCard({ tone, label, value, detail }) {
  return (
    <article className={`metric-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function ProcessCard({ tone, label, value, detail }) {
  return (
    <article className={`process-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function PanelHeader({ title, desc }) {
  return (
    <header className="panel-header">
      <div>
        <h2>{title}</h2>
        <p>{desc}</p>
      </div>
      <button className="dots" type="button" aria-label="เมนู">...</button>
    </header>
  );
}

function SummaryPanel({ title, desc, children }) {
  return (
    <article className="panel summary-panel">
      <PanelHeader title={title} desc={desc} />
      <div className="size-summary-list">{children}</div>
    </article>
  );
}

function SummaryItem({ title, value, children }) {
  return (
    <div className="summary-item">
      <span>
        <strong>{title}</strong>
        <small>{children}</small>
      </span>
      <b>{value}</b>
    </div>
  );
}
