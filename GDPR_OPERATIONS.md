# GDPR operations runbook

This runbook turns the website privacy notice into repeatable operational controls for Latvijas Ugunsdrosibas asociacija. It complements the GDPR, the Latvian Personal Data Processing Law, processor contracts, and professional legal advice; it is not a legal certification.

Complete every **before launch** item and retain evidence. Replace role placeholders with named people in an internal copy of this document or the Association's compliance register.

## Accountability

The Association is the controller for website, form, membership, and registry processing. The board must assign and document these roles:

| Role | Minimum responsibility |
| --- | --- |
| Controller representative | Approves purposes, legal bases, retention, vendors, and risk decisions. |
| Privacy lead | Monitors the privacy mailbox, owns the processing register, coordinates rights requests, and reviews this runbook. |
| Security lead | Owns access, patching, backups, logging, incident response, and processor security reviews. |
| Process owner | Decides access and retention for contact, membership, registry, and publication records. |
| Mailbox owner and deputy | Handle submissions and deletion schedules without using shared credentials. |

**Before launch:** record each person's name, appointment date, deputy, and review date. Assess and document whether a data protection officer is required under Article 37 GDPR. Do not label the ordinary privacy contact as a DPO unless the role is formally appointed, independent, adequately resourced, and free from conflicts.

## Required records

Maintain the following controlled records outside the public repository:

1. An Article 30 record of processing activities (ROPA). The small-organisation exemption should not be relied on for recurring website and membership processing.
2. A legitimate interests assessment (LIA) for answering contact requests, administering membership and registry applications, and website security. Each LIA must record purpose, necessity, impact, reasonable expectations, safeguards, and the objection mechanism.
3. A processor and subprocessor register with service, role, data, hosting locations, contract owner, Article 28 agreement, deletion terms, incident deadline, and review date.
4. An international-transfer register identifying the transfer mechanism, recipient certification where relying on the EU-US Data Privacy Framework, standard contractual clauses where applicable, supplementary measures, and transfer impact assessment.
5. A retention schedule, rights-request register, consent register, security-incident register, access register, and training record.
6. A documented Article 35 DPIA screening. Complete a DPIA before processing likely to result in high risk; record the reasons if the screening concludes that one is not required.

Review Cloudflare Turnstile, Google Maps, the hosting provider, SMTP/email provider, backup provider, domain/DNS provider, and every support party with production access. Determine and record whether each is a processor, subprocessor, or independent controller rather than assuming the same role for every service.

## Processing inventory

Use this as the minimum ROPA baseline and add the actual systems, owners, recipients, transfer details, and approved retention periods before launch:

| Activity | Data and subjects | Purpose and basis | Operational retention |
| --- | --- | --- | --- |
| Website delivery and security | Visitor IP and request/device/security data | Delivery, abuse prevention, diagnosis; Article 6(1)(f) | Rate-limit counters expire within 24 hours. Configure provider and infrastructure logs to the approved short period; use 30 days as the default maximum unless a documented risk requires less or more. |
| Contact form | Sender name, email, message | Receive and answer requests; Article 6(1)(f) | Delete from active mailboxes and work files no later than 12 months after closure. |
| Membership application | Company, position, name, email, phone, description | Assess and administer applications; Article 6(1)(f) | Delete rejected or withdrawn applications no later than 12 months after closure. Move only necessary accepted-member data into the membership record. |
| Registry application | Name, email, company | Assess and administer registry applications; Article 6(1)(f) | Delete application correspondence no later than 12 months after closure unless an approved registry rule requires a documented period. |
| Accepted membership | Member and contact data | Administer membership; confirm the applicable Article 6 basis in the ROPA | Keep during membership, then apply documented statutory and legal-claims periods by record category. Do not use an undefined "as long as necessary" period internally. |
| Google Maps | Visitor IP/device data after opt-in | Display external map; Article 6(1)(a) | The site stores the preference in the visitor's browser. Google controls its own provider-side retention. |
| Honorary member publication | Honorary member name and consent evidence | Public recognition; Article 6(1)(a) | Publish only while consent remains valid. Retain minimal withdrawal evidence as needed to demonstrate compliance. |
| Administration | Admin identity, credentials metadata, activity/security records | Authorised content and system administration; Article 6(1)(f) | Keep accounts only while access is required; retain security records for the approved log period or an active incident. |

If a member name, logo, photograph, biography, sole-trader name, or contact detail will be made public, assess it separately and give the person Article 13 information before publication.

## Collection and publication

- Use the existing fields only for their stated purposes. A new field, analytics tool, marketing use, mailing list, or data match requires a privacy review before release.
- Do not copy form data to personal mailboxes, chat, unmanaged spreadsheets, or local devices. Limit recipients to the mailbox configured for that form.
- Remove unnecessary special-category data and third-party data from free text as soon as it is identified, unless a documented lawful reason requires it.
- Before publishing an honorary member's name, obtain a freely given, specific, informed, unambiguous opt-in. Record the wording/version shown, affirmative action, person, date, scope, and collector. Do not make publication a condition of an unrelated benefit.
- Give honorary members an equally easy withdrawal route. Remove the public name promptly after withdrawal and tell downstream recipients where practicable.
- Use personal data for a materially new purpose only after compatibility and legal-basis review and, where required, a new notice or consent.

## Retention and deletion

The privacy lead and each process owner must run and evidence a monthly deletion check:

1. Close completed requests and record the closure date.
2. Delete expired form messages from inbox, sent mail, archive, trash, spam, exports, ticketing tools, shared drives, and local downloads.
3. Delete unnecessary raw accepted-member applications after transferring only the approved membership record.
4. Review incident holds and legal holds. Record owner, reason, scope, approval, and next review date for every exception.
5. Verify that hosting and email logs follow the approved retention configuration and that application logs contain correlation IDs rather than form contents.
6. Record the date, operator, systems checked, record classes deleted, exceptions, and evidence location.

Set a fixed backup lifecycle before launch. Backups must be encrypted, access-controlled, immutable where appropriate, and automatically expired. A data-subject deletion normally applies to live systems; protect backup copies from ordinary use, let them expire on schedule, and maintain a procedure that reapplies deletions if a backup is restored. Test restore and post-restore deletion at least annually.

## Data-subject requests

Monitor the published privacy mailbox on business days and use the rights-request register for every request.

1. Record receipt date, requested right, systems in scope, owner, identity-check decision, due date, actions, exemptions, disclosures, and completion date.
2. Confirm identity proportionately. Request additional proof only when there is reasonable doubt, disclose the minimum needed, and remove verification copies when no longer required.
3. Search active mailboxes, membership and registry records, admin records, exports, logs reasonably linkable to the person, and relevant processors. Ask processors to assist under the Article 28 contract.
4. Respond without undue delay and within one month. For a complex or numerous request, notify the person within that first month if extending by up to two further months and explain why.
5. Explain any lawful refusal or restriction, the reasons, and complaint and judicial-remedy rights. Obtain legal review before relying on an exemption.
6. Send exports through an authenticated or encrypted channel. Do not expose other people's data; redact or separate it where appropriate.
7. For an Article 21 objection, stop the affected legitimate-interest processing unless compelling overriding grounds or legal-claims needs are documented.
8. For consent withdrawal, stop the consent-based processing promptly. Map consent can be withdrawn in the site footer; honorary-name withdrawal requires removal from the public dataset and caches.

## Security and access

- Give each administrator and operator an individual account. Prohibit shared credentials and review production, mailbox, DNS, Cloudflare, hosting, database, and backup access at least quarterly and on every role change.
- Require MFA for email, hosting, DNS, Cloudflare, source control, backups, and Django administration. If Django admin is not protected by MFA, place it behind an MFA-capable access layer or add an appropriate MFA control before production use.
- Apply least privilege, prompt leaver removal, a password manager, encrypted transport, encrypted backups, supported software, security updates, and restore tests.
- Keep production secrets outside source control. Rotate exposed credentials immediately and document the event in the incident register.
- Review application dependencies and infrastructure patches monthly. Remediate critical internet-facing issues on an emergency schedule set by the security lead.
- Train people handling form and member data on confidentiality, phishing, rights requests, retention, and incident escalation before access and at least annually.

## Personal-data incidents

Everyone with access must report a suspected loss, misdelivery, unauthorised access, account compromise, or accidental publication immediately to the security and privacy leads.

1. Contain the incident without destroying evidence; revoke access, rotate credentials, recall messages, and preserve relevant security records.
2. Record what happened, times, systems, data and people affected, likely consequences, containment, and decisions. Record incidents even when notification is not required.
3. Assess risk to people's rights and freedoms promptly. Obtain processor facts and legal/privacy input; do not wait for perfect certainty.
4. Where the breach is likely to result in risk, notify the Latvian Data State Inspectorate without undue delay and, where feasible, within 72 hours after awareness. If late, document and provide reasons.
5. Where it is likely to result in high risk, communicate clearly to affected people without undue delay unless a GDPR Article 34 exception is documented.
6. Track corrective actions to completion and update controls, the ROPA, DPIA/LIA, training, contracts, or notice where necessary.

Keep the Data State Inspectorate's current reporting channel and the Association's out-of-hours escalation contacts in the internal incident plan, not only in this public repository.

## Release and recurring review

Before every production release that changes personal-data handling:

- Compare code and configuration with the public Latvian and English notices.
- Test all forms, recipient separation, Turnstile, consent-gated external content, withdrawal controls, field limits, and the privacy mailbox.
- Confirm that production builds contain the real privacy address and no test recipient, credential, or personal data.
- Update the ROPA, LIA/DPIA screening, vendor and transfer registers, retention schedule, and policy date where the change is material.
- Obtain controller approval and retain the release checklist.

Perform a full review at least annually and after a new vendor, new form field or purpose, public-data category, security incident, regulatory change, transfer change, merger, or material infrastructure change. Verify the current Data State Inspectorate contact details and obtain Latvian privacy counsel review for unresolved legal-basis, retention, employment, publication, or international-transfer questions.

## Evidence checklist

A compliance review should be able to retrieve:

- Current public notice and previous versions.
- Named owners, ROPA, LIAs, DPIA/DPO assessments, retention schedule, and approvals.
- Processor agreements, vendor reviews, subprocessor lists, transfer mechanisms, and transfer assessments.
- Consent and withdrawal records for published people.
- Monthly deletion records, backup lifecycle evidence, restore tests, and legal holds.
- Rights-request and incident registers with response evidence.
- Access reviews, MFA evidence, training completion, patch reviews, and release privacy checklists.

Do not state that the website or Association is "fully GDPR compliant" solely because this repository passes tests. Compliance also depends on these controls being completed, evidenced, and followed in practice.