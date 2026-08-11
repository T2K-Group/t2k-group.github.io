# To SIM or Not to SIM: SoftSIMs in Production IoT

On paper, a SoftSIM sounds like an obvious choice for a modern IoT product.

Remove the physical SIM and its holder, reduce the bill of materials, simplify manufacturing and provision connectivity through software. Combine that with access to hundreds of mobile networks, and the sales pitch practically writes itself.

We tested that proposition using [Onomondo’s SoftSIM](https://onomondo.com/en-gb/product/softsim/). Technically, it performed exceptionally well. However, when we moved from evaluation to full integration, we discovered that the best-performing technology was not necessarily the right technology for our product.

That distinction matters—and it is why we ultimately returned to physical SIM cards.

## A little background on Onomondo

Onomondo is a Copenhagen-based connectivity provider focused specifically on cellular IoT. The company operates its own cloud-based mobile core and provides access to more than 680 networks across over 180 countries through a single management platform. Its network supports conventional cellular technologies alongside LTE-M and NB-IoT. [Onomondo says](https://onomondo.com/about-us/) it was founded in 2012 and launched its own global IoT network in 2018.

A particularly useful feature of Onomondo’s service is its non-steered network access. Rather than being forced onto a preferred roaming partner, a device can select from the available supported networks based on what works best at its location.

This is valuable for IoT equipment that may be deployed internationally, installed in difficult-to-reach locations or expected to remain operational for many years.

## What is a multi-IMSI SIM?

An IMSI—the International Mobile Subscriber Identity—is the identity used to authenticate a mobile subscription.

A traditional SIM normally contains one operator identity. A multi-IMSI SIM contains several preloaded identities, allowing the device or SIM to select a different identity for a particular country or network. This can provide access to multiple operators without requiring several physical SIM cards.

For IoT deployments, the potential benefits include:

* Better coverage across regions and operators
* Reduced dependence on a single mobile network
* Fewer country-specific hardware variants
* Simpler international deployments
* Improved resilience when one network is unavailable

It is worth noting that Onomondo’s architecture is not a conventional multi-IMSI implementation. Instead, it uses a single global profile and APN, with much of the network-selection complexity handled by its own core network. This aims to provide multi-network access without placing multi-IMSI switching logic on the device itself. Onomondo explains the distinction in its [technical overview of multi-IMSI SIMs](https://onomondo.com/blog/what-is-multi-imsi-sim-for-iot/).

## SoftSIM versus eSIM

The terminology surrounding embedded connectivity can be confusing.

An eSIM, often referring to an eUICC in an embedded MFF2 package, is still a separate physical component soldered onto the circuit board. It provides secure storage for operator credentials and can support remote profile provisioning, but it remains another chip in the design.

A SoftSIM removes that separate component. The SIM functionality runs as software within the cellular module or host processor, with credentials protected using hardware security capabilities already present in the supported platform.

The theoretical benefits are compelling:

* No physical SIM or SIM holder
* Reduced component and assembly costs
* Less PCB space
* No SIM insertion during manufacturing
* Fewer parts that can fail or become disconnected
* Digital provisioning during production
* Easier creation of a single device SKU for multiple markets
* Potentially lower sleep current because there is no separate SIM chip to power

For compact, high-volume devices, those savings can be significant.

## Why LTE-M and NB-IoT matter

Onomondo offers broad support for LTE-M and NB-IoT, although availability still depends on the selected module, country and local network.

Both technologies were designed for IoT devices that send relatively small amounts of data and need to operate efficiently for long periods.

LTE-M provides comparatively higher data rates, lower latency and better support for mobility. It is often a good fit for trackers, mobile sensors and devices that require firmware updates or more responsive communications.

NB-IoT focuses on low data rates, power efficiency and strong coverage penetration. It is particularly useful for stationary sensors, meters and equipment installed inside buildings or below ground.

Both can support power-saving features such as Power Saving Mode and extended Discontinuous Reception. Used correctly, these allow a device to remain dormant for long periods and wake only when it needs to communicate—an essential capability for battery-powered products expected to operate for years.

## Our experience with the SoftSIM

During testing, the SoftSIM worked flawlessly.

It connected to every network we expected it to use and recovered extremely well after losing coverage in poor-signal areas. That reliability was a welcome relief after a previous SIM provider had failed to deliver capabilities that had been promised to us.

From a connectivity perspective, Onomondo’s solution did exactly what we needed. We had no reason to question its network performance.

The problem appeared elsewhere.

## The hidden cost: memory and hardware compatibility

A physical SIM contains its own processor, secure storage and cryptographic functions. With a SoftSIM, some of that responsibility moves into the cellular module or host platform.

That introduces hardware and memory requirements that cannot be ignored.

At the time of writing, Onomondo’s published compatibility table contains seven supported module or platform families. These include Nordic Semiconductor, SIMCom and Quectel products. The restricted range reflects the need for suitable firmware access and secure credential storage—not simply the ability to run ordinary application code.

Memory was the decisive issue in our application.

Onomondo currently describes its Nordic nRF91 sample integration as requiring approximately 110 KB of flash and a heap pool of around 30 KB, with both potentially open to optimisation. Those figures may be entirely reasonable in a larger system, but they are significant in a tightly constrained, low-power cellular product.

During our initial investigation, we encountered information suggesting that memory partitions could be resized to accommodate the additional SIM software. We understood this to mean that the required space could be reclaimed without a serious impact on the rest of the application.

That assumption turned out to be wrong.

The limitation did not become fully apparent until integration testing, when the SoftSIM was combined with the complete customer application. At that point, the individual features that had worked during evaluation all had to coexist within the real device’s RAM and flash budget.

They could not.

The SoftSIM’s connectivity remained excellent, but we could not justify allocating so much of the device’s limited memory to it. The product’s application requirements had to take priority, and we ultimately returned to physical SIM cards.

## The SoftSIM was not the mistake

It would be easy to describe this outcome as a failure of the technology. It was not.

The SoftSIM performed very well. The mistake was selecting it before every system-level constraint had been validated.

We focused on the immediate and highly visible benefits: lower BOM cost, simplified provisioning, reduced manufacturing effort and excellent network access. We did not give enough weight to the less visible costs inside the module—particularly RAM, flash, security requirements and the limited choice of compatible hardware.

Our testing proved that the technology worked. Our integration testing proved that it did not fit this particular product.

Those are two different questions.

## Would we use a SoftSIM again?

Yes—with the right hardware and application.

For a new product using a supported module, with sufficient RAM and flash reserved from the beginning, a SoftSIM could be an excellent choice. Its manufacturing, provisioning and reliability benefits are real.

For an existing design, or a highly constrained low-power device, the decision requires more care. Before committing, we would now validate:

* Exact RAM and flash consumption in a production build
* Peak heap usage, rather than only the nominal footprint
* Secure storage and cryptographic requirements
* Compatibility with the chosen modem and firmware
* Bootloader and memory-partition restrictions
* Licensing implications
* Production provisioning and credential-recovery procedures
* The option of retaining a physical SIM during rollout
* The effect on future firmware growth and over-the-air updates

The last point is easily overlooked. A design that only just fits today may leave no room for security patches, new functionality or an expanding communications stack later.

## The lesson

SoftSIMs are an exciting development in IoT connectivity, and our experience with Onomondo showed that the underlying service can perform extremely well.

But a compelling feature is not automatically the correct architectural choice.

We saw the benefits, made a decision and later discovered that we had underestimated an important constraint. Once the evidence changed, we changed the design. Returning to a physical SIM was less elegant on paper, but it was the better engineering decision for the customer’s product.

Good engineering is not about defending the first decision indefinitely. It is about testing assumptions, recognising when the trade-offs have changed and being willing to choose the less fashionable option when it produces the more reliable system.

Sometimes the right answer is not to SoftSIM—at least, not yet.
